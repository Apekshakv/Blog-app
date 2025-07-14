import React, { useState } from 'react';
import { Form, Input, Button, Typography, Card } from 'antd';
import { useDispatch } from 'react-redux';
import { createPost } from './api';

const { Title } = Typography;

const Forms = () => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  const handleSubmit = () => {
    console.log('Form Data:', postData);
    dispatch(createPost(postData));
    clear();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostData({ ...postData, selectedFile: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file (JPG, PNG, etc.)');
    }
  };

  return (
    <Card title={<Title level={4}>Create a Memory</Title>} style={{ width: '100%' }}>
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Creator">
          <Input
            placeholder="Enter creator name"
            value={postData.creator}
            onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Title">
          <Input
            placeholder="Enter title"
            value={postData.title}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Message">
          <Input
            placeholder="Enter message"
            value={postData.message}
            onChange={(e) => setPostData({ ...postData, message: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Tags">
          <Input
            placeholder="Enter tags (comma-separated)"
            value={postData.tags}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Upload Image">
          <input type="file" accept="image/*" onChange={handleFileUpload} />
          {postData.selectedFile && (
            <img
              src={postData.selectedFile}
              alt="Preview"
              style={{ marginTop: '10px', width: '100%', maxHeight: '300px', objectFit: 'cover' }}
            />
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginRight: '8px' }}>
            Submit
          </Button>
          <Button onClick={clear}>Clear</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Forms;
