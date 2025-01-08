import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography } from '@mui/material';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api';  // Backend API konfiguratsiyasi

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/auth/signin', values); // Login API so'rovi
      if (response.data.jwt) {  // Agar JWT tokeni olingan bo'lsa
        localStorage.setItem('jwt', response.data.jwt); // JWT tokenni localStorage'ga saqlash
        navigate('/my-profile'); // My-profile sahifasiga yo'naltirish
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={object({
          email: string().email('Invalid email').required('Email is required'),
          password: string().min(6, 'Minimum 6 characters').required('Password is required'),
        })}
        onSubmit={handleSubmit}  // Form yuborilganda handleSubmitni chaqirish
      >
        {({ touched, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              error={touched.email && !!errors.email}
              helperText={<ErrorMessage name="email" />}
              margin="normal"
            />
            <Field
              as={TextField}
              name="password"
              label="Password"
              type="password"
              fullWidth
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </form>
        )}
      </Formik>
      <Typography variant='body2' align='center' sx={{mt:3}}>
        Don't have an account?
        <Button size='small' onClick={()=>navigate("/account/register")}>register</Button>
      </Typography>
    </div>
  );
};

export default LoginForm;
