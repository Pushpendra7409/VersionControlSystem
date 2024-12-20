import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../authContext';

import { PageHeader } from '@primer/react/drafts';
import { Box, Button } from '@primer/react'
import './auth.css';

import logo from '../../assets/github-light.svg'

const Login = () => {

   useEffect( () => {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      setCurrentUser(null);
   });

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loading, setLoading] = useState(false);
   const {currentUser, setCurrentUser} = useAuth();

   const handleLogin = async(e) => {
       e.preventDefault();
       try{
        setLoading(true);
        const res = await axios.post('http://localhost:3000/login',{
          email: email,
          password: password
        });

        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.user._id);

        setCurrentUser(res.data.user._id);
        setLoading(false);

        window.location.href = '/'
        
       } catch(err){
         console.error(err.message);
         alert('Failed to login. Please check your credentials.');
         setLoading(false);

       }
   }


  return (
    <div className='login-wrapper'>
      <div className='login-logo-container'>
          <img className='logo-login' src={logo} alt='GitHub logo' />
      </div>

      <div className='login-box-wrapper'>
        <div className='login-heading'>
          <Box sx={{ padding: 1 }}>
            <PageHeader>
            <PageHeader.TitleArea variant='large'>
              <PageHeader.Title>Sign In</PageHeader.Title>
            </PageHeader.TitleArea>
            </PageHeader>
          </Box>
        </div>

        <div className='login-box'>
          <div>
            <label className='label'>Email address</label>
            <input autoComplete='off' name='Email' id='Email' className='input' type='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>

          <div className='div'>
            <label className='label'>Password</label>
            <input autoComplete='off' name='Password' id='Password' className='input' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <Button onClick={handleLogin} variant='Primary' className='login-btn'>Login</Button>

      </div>

      <div className='pass-box'>
        <p>
          New to Github? <a href='/signup'>Create an Account.</a>
        </p>
      </div>
      
    </div>
    </div>
  )
}

export default Login
