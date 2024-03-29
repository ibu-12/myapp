
// import { Link } from "react-router-dom";

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button, createTheme, ThemeProvider, TextField } from '@mui/material';

// import my from '../assest/logo22.jpg';

// export function Login() {
//   const [formData, setFormData] = useState({
//     usernameOrEmail: "",
//     password: "",
//   });

//   const [loginSuccess, setLoginSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!formData.usernameOrEmail || formData.password) {
//       alert("Please fill in all fields");
//       return;
//     }

//     // Retrieve user credentials from local storage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     const storedUsernameOrEmail = storedUser.email;
//     const storedPassword = storedUser.password;

//     if (!storedUsernameOrEmail || !storedPassword) {
//       alert("User not found. Please sign up.");
//       return;
//     }

//     // Validate entered credentials
//     if (
//       formData.usernameOrEmail === storedUsernameOrEmail &&
//       formData.password === storedPassword
//     ) {
//       alert("Login successful!");
//       setLoginSuccess(true);
//     } else {
//       alert("Invalid credentials. Please try again.");
//     }

//     // Reset form after submission
//     setFormData({
//       usernameOrEmail: "",
//       password: "",
//     });
//   };
//   const theme = createTheme({
//     // your theme configuration
//   });

//   return (
//     <div style={{
//       marginLeft: '450px',
//       marginTop: '25px',
//       backgroundColor: '#3a16014b',
//       textAlign: 'left',
//       color: 'rgb(50, 30, 9)',
//       padding: '10px 50px',
//       width: '750px',
//       height: '570px',
//       overflow:'hidden',
//       fontFamily: 'URW Chancery L, cursive',
//       borderRadius: '30px'
//   }}>
//       <h2 style={{textAlign:'center',backgroundColor: '#3a16014b', padding: '8px'
//       }}>Login</h2>
//       <form onSubmit={handleSubmit}>
//         <br/>
//       <TextField required input type="email" name="usernameOrEmail" placeholder="Email" onChange={handleChange} /><br/><br/>
//         <TextField required input type="password" name="password" placeholder="Password" onChange={handleChange} /><br/><br/>
//       <h6>Don't you have an account? <Link to='/register' className='nln'>Register</Link></h6><br/>
//       <Button type='submit' variant='contained' color='secondary' >Login</Button> 
//       </form>
//       <div style={{
//           marginRight: '500px',
//           position:'relative',
//           left:'301px',
//           bottom: '260px'
//        }}>
//        <img src={my} height='480px' width='350px'></img>
//        </div>
//   </div>

      
//   );
// }

// export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import my from '../assest/logo22.jpg';
import '../assets/styles/nav.css';
import {Button,createTheme,ThemeProvider,TextField} from '@mui/material';
// import { Button } from 'bootstrap';
const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    // Clear error message when the user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(credentials);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: credentials,
      });
      if (response.data.length > 0) {
        console.log('Login successful!');
        window.location.href='/'
        // Redirect or handle successful login
      } else {
        console.log('Login failed! Invalid credentials.');
        // Handle invalid login
        
      }
    } catch (error) {
      console.error('Login failed!', error);
      // Handle error scenarios
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username) {
      errors.username = 'Username is required';
    }
    if (!data.password) {
      errors.password = 'Password is required';
    }
    return errors;
  };
  const theme = createTheme({
    palette: {
      primary: {
        main: 'rgb(50, 30, 9)',
        // light: will be calculated from palette.primary.main,
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: 'rgb(50, 30, 9)',
        light: 'rgb(50, 30, 9)',
        // dark: will be calculated from palette.secondary.main,
        contrastText: '#96723f',
      },
    },
  });
  return (
    <div style={{
      marginLeft: '450px',
      marginTop: '10px',
      backgroundColor: '#3a16014b',
      textAlign: 'left',
      color: 'rgb(50, 30, 9)',
      padding: '10px 50px',
      width: '750px',
      height: '590px',
      overflow:'hidden',
      fontFamily: 'URW Chancery L, cursive',
      borderRadius: '30px'
  }}>
      <div className="inner">
      
        <form className="form" onSubmit={handleSubmit}>
          <br/>
          <h3>Login Form</h3>
          <br/>
          <div className="form-wrapper">
            <TextField input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Username or Email"
              
            />
            <br/>
            {errors.username && <span className="error">{errors.username}</span>}
          </div>
          <br/>
          <div className="form-wrapper">
            <TextField input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Password"
              
            />
            <br/>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <br/>
          <div>
            <p>Don't have an account <Link to='/siup' className='lin'>Signup</Link></p>
          </div>

          
          <ThemeProvider theme={theme}>
                <Button variant='contained' color='secondary' sx={{ ml: 3 }} type='submit'>LOGIN</Button>
                </ThemeProvider> 
        </form>
        <div style={{
                marginRight: '500px',
                position:'absolute',
                left:'770px',
                bottom: '80px'
             }}>
             <img src={my} height='500px' width='400px'></img>
             </div>
      </div>
    </div>
  );
};

export default Login;