import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const Poast = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ textAlign: 'center' }}>All Poasts</h2>
      {posts.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No posts found.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          {posts.map((post) => (
            <div key={post._id} style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '1rem',
              backgroundColor: '#fafafa'
            }}>
              {post.selectedFile && (
                <img
                  src={post.selectedFile}
                  alt="post"
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
                />
              )}
              <h3>{post.title}</h3>
              <p>{post.message}</p>
              <p><strong>By:</strong> {post.creator}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
