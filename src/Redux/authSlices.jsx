import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userRole: null,
  patientInfo: {
    id:null,
    name: null,
    email: null,
    mobile: null,
    is_doctor :null,
  },
  doctorInfo: {
    id:null,
    name: null,
    email: null,
    mobile: null,
    is_doctor :null,
  },
  adminInfo:{
    id:null,
    name: null,
    email: null,
    mobile: null,
    is_doctor :null,
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(action.payload.role, 'Role');
      if (action.payload.role === 'Patient') {
        console.log('action.payload.access_token',action.payload.access_token);
        // state.patientInfo = { ...action.payload.patientInfo };
        state.patientInfo.access_token=action.payload.access_token;
        state.patientInfo.id=action.payload.patientInfo.id;
        state.patientInfo.name=action.payload.patientInfo.first_name;
        state.patientInfo.email=action.payload.patientInfo.email;
        state.patientInfo.mobile=action.payload.patientInfo.mobile;
        state.patientInfo.is_doctor=action.payload.patientInfo.is_doctor;
      }
      
      else if (action.payload.role === 'Doctor') {
        // state.doctorInfo = { ...action.payload.doctorInfo };
        state.doctorInfo.access_token=action.payload.access_token;
        state.doctorInfo.id=action.payload.doctorInfo.id;
        state.doctorInfo.name=action.payload.doctorInfo.first_name;
        state.doctorInfo.email=action.payload.doctorInfo.email;
        state.doctorInfo.mobile=action.payload.doctorInfo.mobile;
        state.doctorInfo.is_doctor=action.payload.doctorInfo.is_doctor;

      }    

      else if (action.payload.role === 'Admin') {
        // state.doctorInfo = { ...action.payload.doctorInfo };
        state.adminInfo.access_token=action.payload.access_token;
        state.adminInfo.id=action.payload.adminInfo.id;
        state.adminInfo.name=action.payload.adminInfo.first_name;
        state.adminInfo.email=action.payload.adminInfo.email;
        state.adminInfo.mobile=action.payload.adminInfo.mobile;
        state.adminInfo.is_doctor=action.payload.adminInfo.is_doctor;
      }    
    },

    logout: (state, action) => {
      console.log(action.payload.role, 'logout...............');
      if (action.payload.role === 'Patient') {
          state.patientInfo = {
          id:null,
          name: null,
          email: null,
          mobile: null,
          access_token: null,
          is_doctor:null,
        };
      }
      else  if (action.payload.role === 'Doctor') {
          state.doctorInfo = {
          id:null,
          name: null,
          email: null,
          mobile: null,
          access_token: null,
          is_doctor:null,
        };
      }
      else  if (action.payload.role === 'Admin') {
          state.adminInfo = {
          id:null,
          name: null,
          email: null,
          mobile: null,
          access_token: null,
          is_doctor:null,
        };
      }
    },
    setRole: (state, action) => {
      state.userRole = action.payload.role;
    },
    unSetRole: (state, action) => {
        state.userRole = action.payload.role;
      },
  },
});

export const { setCredentials, logout, setRole, unSetRole } = authSlice.actions;
export default authSlice.reducer;
