// Signin.js
import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import './Signin.css';
import axios from 'axios';

const Signin = () => {
    const [showSignup, setShowSignup] = useState(false)
    const [message, setMessage] = useState("")

    const toggleSignup=()=>{
      setShowSignup(!showSignup)
    }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        appType: 'ecommerce',
      });
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
   
const loginFn=async(e)=>{
    e.preventDefault();
    try {
        const data={
            email:formData.email,
            password:formData.password,
            appType:formData.appType
        }
        let response=await axios({
            url:"https://academics.newtonschool.co/api/v1/user/login",data,
            method:"POST",
            headers:{
                projectID:"f104bi07c490"
            }
        })
        if(response?.data?.status==='success'){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('name',response.data.data.name)
            localStorage.setItem('email',response.data.data.email)
            alert("Login Successfully")
            window.location.href="/"
        }else
        setMessage("Invalid credentials")
    } catch (error) {
        
        setMessage("Invalid credentials")
        console.log("something went wrong", error)
    }
  
}
const loginContent=()=>{
  return (
    <div className="signin-container" style={{backgroundColor:"red"}}>
      <form onSubmit={loginFn} className="signin-form" >
        <TextField
          label="Email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small" 
          style={{ backgroundColor: '#e0e0e0' }} 
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          size="small" 
          style={{ backgroundColor: '#e0e0e0' }} 
        />
        <Button type="submit" variant="contained" color="primary">
          Sign In
        </Button>
        <div>
      <Button className="signup-btn" onClick={toggleSignup} variant="text" color="info" >
        Don't have an Account? Signup
      </Button>
      <br />
      <Typography className="auth-error-msg" variant="body2" color="error" align="center">
        {message}
      </Typography>
    </div>
      </form>
    </div>
  );
};

const SignupPage =async (e) => {
    e.preventDefault();
    try {
        const data={
            name:formData.name,
            email:formData.email,
            password:formData.password,
            appType:formData.appType
        }
       console.log(formData)
        let response=await axios({
            url:"https://academics.newtonschool.co/api/v1/user/signup",data,
            method:"POST",
            headers:{
                projectID:"f104bi07c490"
            }
        })
        if(response?.data?.status==='success'){
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('name',response.data.data.name)
            localStorage.setItem('email',response.data.data.email)
            alert("Registration Successfully")
           
                window.location.href="/"
         
        }

    } catch (error) {
        
        setMessage("Invalid credentials")
        console.log("something went wrong", error)
    }
}
const signUpContent=()=>{
    
  return (
    <div className="signin-container" style={{backgroundColor:"red"}}>
    <form onSubmit={SignupPage} className="signin-form" >
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required
      />
    
      <Button type="submit" variant="contained" color="primary">
        Sign Up
      </Button>
      <div>
      <Button className="signup-btn" onClick={toggleSignup} variant="text" color="info">
        Already account have? SignIn
      </Button>
      <br />
      <Typography className="auth-error-msg" variant="body2" color="error" align="center">
        {message}
      </Typography>
    </div>
    </form>
    </div>
  );
}
  return (
    <div>
          {
              showSignup
              ?signUpContent()
              :loginContent()
            }
    </div>
  )

 }

export default Signin;
