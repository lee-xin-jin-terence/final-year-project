import React from 'react';
import './LoginForm.css';
import FormLogin from './LoginForm';



const LoginFormHolder = () => {

  return (
    <>
      <div className='login-form-container'>
        <div className='form-content-left'>
          <img className='form-img' src='./img/logo.jpg' alt='iu1' />
        </div>
        
          <FormLogin  />
       
      </div>
    </>
  );
};

export default LoginFormHolder;
