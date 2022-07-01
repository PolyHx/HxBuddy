import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, TextField } from '@mui/material';
import axios from 'axios';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

export const LoginForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const { email, password } = values;

      const json = JSON.stringify({
        email,
        password,
      });

      const configHeaders = {
        'content-type': 'application/json',
        Accept: 'application/json',
      };
      const res = await axios.post('http://localhost:8000/auth/login', json, {
        headers: configHeaders,
      });
      console.log(res);
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} autoComplete="off">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Grid>

        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
