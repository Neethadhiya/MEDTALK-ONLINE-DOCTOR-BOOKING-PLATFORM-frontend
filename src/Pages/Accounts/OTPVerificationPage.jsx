import React from 'react'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import OTPVerification from '../../Components/Account Component/OTPVerification/OTPVerification'

function OTPVerificationPage() {
  return (
    <div>
       <PatientHeader />
          <OTPVerification />
        {/* <Footer /> */}
    </div>
  )
}

export default OTPVerificationPage
