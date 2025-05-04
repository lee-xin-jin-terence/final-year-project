import React from 'react';
import './LoginForm.css';
import { useState } from "react";
import { useHistory } from "react-router-dom";


const LoginForm = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  function validateData(e)
  {
    //prevents the default react behaviour of page refreshing
    // after clicking the submit button
    e.preventDefault();

    if (username.length === 0)
    {
      alert("You did not enter username");
    } 
    else if (password.length === 0)
    {
      alert("You did not enter password");
      
    }
    else
    {
      sendDataToServer();
    }
    

  }



  function sendDataToServer()
  {
    
    let loginData = {
      "username" : username,
      "password" : password
    };


    let jsonEncodedLoginData = JSON.stringify(loginData);
 
    let xhr = new XMLHttpRequest();
 
    xhr.onreadystatechange = function (){
      
        
        if (this.readyState == 4 && this.status != 200)
        {
          alert("Failed to login " + this.readyState + " " + this.status);
          return;
        }

        if (this.readyState == 4 && this.status == 200){
  
          let receivedReplyObject = JSON.parse(this.responseText);

          if (receivedReplyObject["loginOutcome"] == "success")
          {
            alert("Login is successful. Welcome " + 
                  receivedReplyObject["username"] + "!");
            
            //go to the dashboard
            history.push("/Dashboard");
            //redirect page to dashboard code
            
          }
          else
          {
            alert("Failed to login. Invalid Credentials Entered");
          }
        }
    };
    
    //remove port number 1234
    xhr.open("POST", "http://localhost:1234/login.php", true);
  
    xhr.send(jsonEncodedLoginData);
  }


  return (
    <div className='login-form-content-right'>
      <form className='login-form' noValidate>
        <h1>
          Login Form
        </h1>
        <div className='form-inputs'>
          <label className='form-label'>Username</label>
          <input
            className='form-input'
            type='text'
            name='username'
            placeholder='Enter your username'
            onInput={e=>setUsername(e.target.value.trim())}
          />
          
        </div>
        
        <div className='form-inputs'>
          <label className='form-label'>Password</label>
          <input
            className='form-input'
            type='password'
            name='password'
            placeholder='Enter your password'
            onInput={e=>setPassword(e.target.value)}
          />
        </div>
        
        <button className='form-input-btn' type='submit' onClick={e=>validateData(e)}>
          Submit
        </button>
        
      </form>
    </div>
  );
};

export default LoginForm;
