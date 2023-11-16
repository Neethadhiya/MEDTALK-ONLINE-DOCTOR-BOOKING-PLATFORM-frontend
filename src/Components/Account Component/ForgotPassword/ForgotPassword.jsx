import React from 'react'
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
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import ForgotPasswordValidation from '../../Validation/ForgotPasswordValidation'
import {baseUrl} from '../../../utils/constants'
import publicInstance from '../../../Axios/PublicAxios';


const defaultTheme = createTheme();
const initialValuesRegister = {
    Email : '',
}

function ForgotPassword() {
    const handleSubmit = async (values , { resetForm })=>{
        const payload = {
            email : values.Email,
        }
        console.log("email",values.Email);
        localStorage.setItem('email',values.Email)
        try{
            resetForm();
            const response = await publicInstance.post('forgot_password/', payload)
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
          Forgot Password
        </Typography>
        <Formik 
        initialValues={initialValuesRegister}
        validationSchema={ForgotPasswordValidation}
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
            id="Email"
            label="Email"
            name="Email"
            autoComplete="Email"
            autoFocus
            value={values.Email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    Boolean(touched.Email) && Boolean(errors.Email)
            }
          />
           <div className="error-container">
                  {touched.Email && errors.Email && (
                    <div className="helper-text">{errors.Email}</div>
                  )}
            </div>
        </div>

        <CustomButton>Send Link</CustomButton>
       
        </Box>
         )}
        </Formik>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default ForgotPassword
