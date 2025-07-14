
import React, { useState } from 'react';
import { Input, Button, Typography, Card, message } from 'antd';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;
const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
 
   const onFinish = async () => {
     try {
       const response = await axios.post('http://localhost:5000/forms/check', {
         Email: email,
         userpassword: password,
       });
 
       console.log(response.data);
 
       setEmail('');
       setPassword('');
         if (response.data.exists == true) {
            console.log('hello')
              navigate('/blog'); 
            }
        else{
            console.log('signup')
        }
      
     } catch (error) {
       console.error('Submission error:', error);
       message.error('Failed to submit form');
     }
   };
 
   return (
     <div style={{ width: 400, margin: '100px auto' }}>
       <Card title={<Title level={4}>Login</Title>}>
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
   to="/"
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
SignUp
 </Link>
 
         </form>
       </Card>
     </div>
   );
 };


export default Login