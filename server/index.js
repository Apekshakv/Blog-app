const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const bodyParser = require('body-parser');
const login = require('./form');
app.use(login)

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


mongoose.connect("mongodb+srv://kvapeksha3:@cluster0.neqzahq.mongodb.net/React", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})



app.use(cors({
  origin: 'http://localhost:3000',  
  methods: ['GET', 'POST'],
}));

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const Post = mongoose.model("Post", postSchema);

app.post('/posts', async (req, res) => {
    try {
    const newPost = new Post(req.body);
    await newPost.save();
    res.json(newPost); 
  } catch (err) {
    console.log(err)
  }
});

app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

