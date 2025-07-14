import React, { useState } from 'react';
import { Input, Button, Typography, Card, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const Frontpage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = async () => {
    try {
      const response = await axios.post('http://localhost:5000/forms', {
        Email: email,
        password: password,
      });

      console.log(response.data);

     if (response.data.message === 'Email already exists') {
        alert('Email already exists, Click on Login and Post your Blog');
      }

      if (response.data.message === 'User created successfully') {
        alert('User created successfully, Click on Login and Post your Blog');
      }

      setEmail('');
      setPassword('');
      message.success('Form submitted successfully!');
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Failed to submit form');
    }
  };

  return (
    <div style={{ width: 400, margin: '100px auto' }}>
        <Title
  level={3}
  style={{
    fontFamily: 'Waltograph, cursive',
    fontSize: '2rem',
    color: 'black',
    textShadow: '2px 2px 4px #000',
    letterSpacing: '1px',
  }}
>
  WELCOME TO BLOG POST
</Title>
      <Card title={<Title level={4}>SignUp</Title>}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onFinish();
          }}
        >
          <div style={{ marginBottom: 16 }}>
            <label>Email</label>
            <Input
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label>Password</label>
            <Input.Password
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="primary" htmlType="submit">
            Submit
          </Button>
       


<Link
  to="/login"
  style={{
    padding: '8px 16px',
    backgroundColor: '#1890ff',
    color: 'white',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    textAlign: 'center',
    marginLeft:'5px'
  }}
>
  Login
</Link>

        </form>
      </Card>
    </div>
  );
};

export default Frontpage;
