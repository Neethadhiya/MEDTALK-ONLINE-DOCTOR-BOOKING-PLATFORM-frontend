import React from 'react'
import ResetPassword from '../../Components/Account Component/ResetPassword/ResetPassword'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'

function ResetPasswordPage() {
  return (
    <div>
        <PatientHeader />
            <ResetPassword />
        {/* <Footer /> */}
    </div>
  )
}

export default ResetPasswordPage
