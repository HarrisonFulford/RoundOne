import React from 'react';
import Navbar from '../components/Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar/>
      <div className='base-layout container text-center pt-4 pb-5'>
        <div className='row'>
            <div className='col'></div>
            <div className='col-10'>{children}</div>
            <div className='col'></div>
        </div>
      </div>
    </>
  );
};

export default Layout;