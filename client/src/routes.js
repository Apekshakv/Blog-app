import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Frontpage from './frontpage';
import App from './App';
import Login from './Login';

const Routesr = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Frontpage />} />
        <Route path='/blog' element={<App />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
};

export default Routesr;
