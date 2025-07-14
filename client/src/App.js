import React, { useEffect } from 'react';
import img from './imags/Screenshot (124).png';
import Forms from './Form';
import Poasts from './Poasts';
import { Typography, Layout, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/getpoasts';
import './App.css';
import { Link } from 'react-router-dom';
const { Header, Content } = Layout;

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Layout className="app-layout">
      <Header className="navbar">
        <div className="navbar-content">
          <Typography.Title level={3} className="navbar-title"  img src={img} alt="logo"  style={{
            color :'whitesmoke'
          }} >Memories</Typography.Title>
        
        </div>
        
      </Header>

      <Content className="main-content">
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12} lg={8}>
            <Forms />
          </Col>
          <Col xs={24} md={12} lg={12}>
            <Poasts />
          </Col>
        </Row>
      </Content>
      <Link
  to="/"
  style={{
    color: 'white',
    padding: '6px 12px',
    backgroundColor: '#000080',
    borderRadius: '3px',
    textDecoration: 'none',
    fontWeight: 'bold',
    display: 'inline-block',
    textAlign: 'center',
    width: '30%',
    marginLeft:'200px'
  }}
>
  Home
</Link>
    </Layout>
  );
};

export default App;
