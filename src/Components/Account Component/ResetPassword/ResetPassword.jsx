import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CustomButton from '../../Helpers/CustomButton';
import { Formik } from 'formik';
import './ResetPassword.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useParams  } from 'react-router-dom';
import * as yup from 'yup';
import ResetPasswordValidation from '../../Validation/ResetPasswordValidation';
import {baseUrl} from '../../../utils/constants'
import publicInstance from '../../../Axios/PublicAxios';

const defaultTheme = createTheme();
  const initialValuesRegister = {
    Password : '',
    ConfirmPassword : '',
}
function ResetPassword() {
  const { token } = useParams();

  const handleSubmit =  async (values , { resetForm })=>{
  const email = localStorage.getItem('email')
  console.log("emsil",email);
  localStorage.removeItem('email')
    const payload = {
        password : values.Password,
        email : email,
        token : token,
    }
   
    try{
      resetForm();
      const response = await publicInstance.post('reset_password/', payload)
      if(response.data.success){
          toast.success(response.data.message)
      }
  }catch(error){
      toast.error(error.response.data.message);
      console.error("Error :",error)
  
  }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs"  style={{height:'390px'}}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#0d9eb5' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{fontSize:'16px'}}>
          Reset Password
        </Typography>
        <Formik 
        initialValues={initialValuesRegister}
        validationSchema={ResetPasswordValidation}
        onSubmit={handleSubmit}>
           {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
                isValid,
            }) =>(  
        <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
               <div className="field-container">
                <TextField
                  margin="normal"
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="Password"
                  autoComplete="Password"
                  value={values.Password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.Password) && Boolean(errors.Password)
                  }
                />
                <div className="error-container1">
                  {touched.Password && errors.Password && (
                    <div className="helper-text">{errors.Password}</div>
                  )}
                </div>
                </div>

                <div className="field-container">
                <TextField
                  margin="normal"
                  fullWidth
                  name="ConfirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="ConfirmPassword"
                  autoComplete="confirm-password"
                  value={values.ConfirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.ConfirmPassword) && Boolean(errors.ConfirmPassword)
                  }
                />
                <div className="error-container">
                  {touched.ConfirmPassword && errors.ConfirmPassword && (
                    <div className="helper-text">{errors.ConfirmPassword}</div>
                  )}
                </div>
                </div>

        <CustomButton>Change Password</CustomButton>
       
        </Box>
         )}
        </Formik>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default ResetPassword
