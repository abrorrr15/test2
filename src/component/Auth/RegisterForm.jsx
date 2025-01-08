import React from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { TextField, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';
import { api } from '../config/api'; // Backend API konfiguratsiyasi

// Dastlabki qiymatlar
const initialValues = {
  fullName: '',
  email: '',
  password: '',
  role: '', // Bo'sh rol
};

// Validatsiya sxemasi
const validationSchema = object({
  fullName: string().required('Full name is required'),
  email: string().email('Invalid email format').required('Email is required'),
  password: string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: string().required('Role is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();

  // Form yuborish
  const handleSubmit = async (values) => {
    try {
      const response = await api.post('/auth/signup', values); // Backendga so'rov
      console.log('Registration successful:', response.data);

      // Agar ro'yxatdan o'tish muvaffaqiyatli bo'lsa, profilga yo'naltirish
      navigate('/my-profile'); // Muvaffaqiyatli ro'yxatdan o'tgandan so'ng yo'naltirish
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div>
      <Typography variant="h5" align="center" gutterBottom>
        Register
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <Field
              as={TextField}
              name="fullName"
              label="Full Name"
              fullWidth
              variant="outlined"
              error={touched.fullName && !!errors.fullName}
              helperText={<ErrorMessage name="fullName" />}
              margin="normal"
            />

            {/* Email Field */}
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              error={touched.email && !!errors.email}
              helperText={<ErrorMessage name="email" />}
              margin="normal"
            />

            {/* Password Field */}
            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              type="password"
              variant="outlined"
              error={touched.password && !!errors.password}
              helperText={<ErrorMessage name="password" />}
              margin="normal"
            />

            {/* Role Selection */}
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="role-select-label">Role</InputLabel>
              <Field
                as={Select}
                name="role"
                labelId="role-select-label"
                label="Role"
                error={touched.role && !!errors.role}
              >
                <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
              </Field>
              <ErrorMessage name="role" component="div" style={{ color: 'red', marginTop: '4px' }} />
            </FormControl>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, padding: '1rem' }}
            >
              Register
            </Button>
          </form>
        )}
      </Formik>

      <Typography variant="body2" align="center" sx={{ mt: 3 }}>
        Already have an account?{' '}
        <Button size="small" onClick={() => navigate('/account/login')}>
          Login
        </Button>
      </Typography>
    </div>
  );
};

export default RegisterForm;
