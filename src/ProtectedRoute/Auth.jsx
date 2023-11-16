import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

function Auth() {
    let access_token;
    const role = useSelector((state)=>state.auth.userRole)
    if(role === 'Patient'){
        access_token = useSelector((state)=>state.auth.patientInfo.access_token)
    }else  if(role === 'Doctor'){
        access_token = useSelector((state)=>state.auth.doctorInfo.access_token)
    }else  if(role === 'Admin'){
        access_token = useSelector((state)=>state.auth.adminInfo.access_token)
    }
    if(access_token){
        return <Outlet />
    }else{
        return <Navigate to='/login' />
    }
   
 
}

export default Auth
