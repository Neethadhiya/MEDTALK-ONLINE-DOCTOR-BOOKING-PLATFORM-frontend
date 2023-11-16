import React from 'react'
import DoctorHeader from '../../Components/Role/Doctor/DoctorHeader/DoctorHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import DoctorDashboard from '../../Components/Role/Doctor/DoctorDashboard/DoctorDashboard'

function DoctorDashboardPage() {
  return (
    <div>
      <DoctorHeader />
        <DoctorDashboard />
      {/* <Footer /> */}
    </div>
  )
}

export default DoctorDashboardPage
