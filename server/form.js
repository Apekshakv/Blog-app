const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');


router.use(bodyParser.json({ limit: '30mb', extended: true }));
router.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
router.use(cors({
  origin: true, 
  methods: ['GET', 'POST'],
  credentials: true
}));


mongoose.connect('mongodb+srv://kvapeksha3:cpxkVvigLniZdFQP@cluster0.neqzahq.mongodb.net/React', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(" Connected to MongoDB Atlas via Mongoose"))
.catch(err => console.error(" MongoDB connection error:", err));


const loginSchema = new mongoose.Schema({
  Email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
}, { timestamps: true });

const User = mongoose.model('User', loginSchema);


router.post('/forms', async (req, res) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.json({ message: 'Email and password are required' });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ Email, password: hash });
    await newUser.save();

    res.json({
      message: 'User created successfully',
      user: { Email: newUser.Email, _id: newUser._id }
    });

  } catch (err) {
    console.error('Save failed:', err);
    if (err.code === 11000) {
      return res.json({ message: 'Email already exists' });
    }
    res.json({ message: 'Server error while saving user' });
  }
});


router.post('/forms/check', async (req, res) => {
  try {
    const { Email, userpassword } = req.body;

    if (!Email || !userpassword) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ Email });
    if (!user) {
      return res.json({ exists: false });
    }

    const isVaild = await bcrypt.compare(userpassword, user.password);
    if (isVaild) {
      return res.json({ exists: true, user: { Email: user.Email, _id: user._id } });
    } else {
      return res.json({ exists: false });
    }

  } catch (err) {
    console.error('Login check failed:', err);
    res.json({ message: 'Server error while checking login' });
  }
});

module.exports = router;

