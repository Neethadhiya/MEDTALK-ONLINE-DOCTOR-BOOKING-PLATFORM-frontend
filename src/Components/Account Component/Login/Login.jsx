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
import LoginValidationSchema from '../../Validation/LoginValidationSchema';
import { Formik } from 'formik';
import './Login.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {baseUrl} from '../../../utils/constants';

import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../../../Redux/authSlices';
import publicInstance from '../../../Axios/PublicAxios';
import { setRole } from '../../../Redux/authSlices';

const defaultTheme = createTheme();
const initialValuesRegister = {
    Email : '',
    Password : '',
}
function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async (values , { resetForm })=>{
        const payload = {
            email : values.Email,
            password : values.Password,
        }
        try{
            resetForm();
            const response = await publicInstance.post('login/', payload)
            if(response.data.success){
                toast.success(response.data.message)
                const role =  response.data.user_info['role']
                const access_token = response.data.access_token
                const refresh_token = response.data.refresh_token
                if(role === 'Patient'){
                  const patientInfo =response.data.user_info
                  localStorage.setItem('PatientAccessToken', access_token)
                  localStorage.setItem('PatientRefreshToken', refresh_token)
                  const storedAccessToken  = localStorage.getItem('PatientAccessToken')
                  dispatch(setCredentials({ patientInfo,role : 'Patient',access_token: storedAccessToken}))                 
                  dispatch(setRole({role : 'Patient'}))
                  navigate('/patient')
                }
                else
                 if(role === 'Doctor'){
                  const doctorInfo = response.data.user_info
                  localStorage.setItem('DoctorAccessToken', access_token)
                  localStorage.setItem('DoctorRefreshToken', refresh_token)
                  const storedAccessToken  = localStorage.getItem('DoctorAccessToken')
                  dispatch(setRole({role : 'Doctor'}))
                  dispatch(setCredentials({ doctorInfo,role : 'Doctor',access_token : storedAccessToken}))                 
                   navigate('/doctor')
                }
                else if(role === 'Admin'){
                  const adminInfo = response.data.user_info
                  localStorage.setItem('AdminAccessToken', access_token)
                  localStorage.setItem('AdminRefreshToken', refresh_token)
                  const storedAccessToken  = localStorage.getItem('AdminAccessToken')
                  dispatch(setRole({role : 'Admin'}))
                  dispatch(setCredentials({ adminInfo, role : 'Admin',access_token : storedAccessToken}))
                  navigate('/admin')
                }
            }
        }catch(error){
            if (error.response) {
                const errorData = error.response.data;
                const errorMessages = [];
                for (const field in errorData) {
                    if (Array.isArray(errorData[field])) {
                        errorMessages.push(...errorData[field]);
                    } else if (typeof errorData[field] === 'string') {
                        errorMessages.push(errorData[field]);
                    }
                }
        
                const filteredErrorMessages = errorMessages.filter(message => typeof message === 'string');
                if (filteredErrorMessages.length > 0) {
                    toast.error(filteredErrorMessages.join('\n'));
                } else {
                    console.error("No specific error messages found in response data.");
                    toast.error("Unknown error occurred");
                }
            } else {
                console.error("Network error occurred:", error);
                toast.error("Network error occurred");
            }
        }
    }
 
    
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs"  style={{height:'430px'}}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#0d9eb5' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{fontSize:'16px'}}>
          Login
        </Typography>
        <Formik 
        initialValues={initialValuesRegister}
        validationSchema={LoginValidationSchema}
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

        <div className="field-container">
          <TextField
            margin="normal"
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="Password"
            autoComplete="current-password"
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

        <CustomButton>Login</CustomButton>
        <Link to='/forgot_password'  style={{textTransform:'capitalize',color:'#0d9eb5',textDecoration:'none',marginLeft:'30px' }}>
            <strong> Forgot Your Password ?</strong>
        </Link>
        </Box>
         )}
        </Formik>
      </Box>
    </Container>
  </ThemeProvider>
  )
}

export default Login
