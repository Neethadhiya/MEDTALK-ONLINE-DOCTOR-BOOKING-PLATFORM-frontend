import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import CustomButton from '../../Helpers/CustomButton';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {baseUrl} from '../../../utils/constants'
import publicInstance from '../../../Axios/PublicAxios';


const defaultTheme = createTheme();
function OTPVerification() {
    const [otp, setOtp] = useState(''); 
    const navigate = useNavigate()
    const otpInputStyle = {
        width: '60px', 
        height: '60px', 
        fontSize: '24px', 
        textAlign: 'center',
        margin: '0 10px', 
        border: '1px solid black', 
        borderRadius: '4px', 
      };
    const handleClick = async()=>{
      const email = localStorage.getItem('email');
      localStorage.removeItem('email');
      try{
        const payload = {
           otp : otp,
           email : email,}
        const response = await publicInstance.post('verify_otp/',payload)
        if(response.data.success){
          toast.success(response.data.message)
          navigate('/login')
        }else{
          toast.error(response.data.message)
          navigate('/register')
        }
      }catch(error){
        toast.error(error.response.data.message)
        navigate('/register')
      }
      }
    
  
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs" style={{height:'360px'}}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop:'130px',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#0d9eb5' }}>
                <LockOutlinedIcon />
        </Avatar>
        <Typography sx={{color:'#0d9eb5',marginBottom:'20px',fontSize:'16px'}}>
        Enter your OTP
        </Typography>
        <Box sx={{ mt: 1 }}>
           <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={4}
                    renderInput={(props) => <input {...props} />}
                    inputStyle={otpInputStyle} />
                  <CustomButton onClick={handleClick} >Verify OTP</CustomButton>
        </Box>
      </Box>

    </Container>
  </ThemeProvider>
  )
}

export default OTPVerification
