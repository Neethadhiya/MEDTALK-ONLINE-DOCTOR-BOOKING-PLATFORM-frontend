import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Outlet, Navigate } from 'react-router-dom'

function UnAuth() {
    const role = useSelector((state)=>state.auth.userRole)
    if(role === 'Patient'){
        return <Navigate to='/patient' />
    }
    else if(role === 'Doctor'){
        return <Navigate to='/doctor' />
    }else if(role === 'Admin'){
        return <Navigate to='/admin' />
    }
    else{
        return <Outlet />
    }
 
}

export default UnAuth
