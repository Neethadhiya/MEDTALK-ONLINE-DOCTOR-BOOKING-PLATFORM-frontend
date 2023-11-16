import React from 'react'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import PatientDashboard from '../../Components/Role/Patient/PatientDashboard/PatientDashboard'

function PatientDashboardPage() {
  return (
    <div>
      <PatientHeader />
        <PatientDashboard />
      {/* <Footer /> */}
    </div>
  )
}

export default PatientDashboardPage
