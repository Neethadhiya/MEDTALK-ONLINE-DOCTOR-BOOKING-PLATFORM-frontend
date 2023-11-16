import React from 'react'
// import Footer from '../../Components/Account Component/Footer/Footer'
import AdminHeader from '../../Components/Role/Admin/AdminHeader/AdminHeader'
import AdminDoctorDetails from '../../Components/Role/Admin/AdminDoctorDetails'
import { useParams } from 'react-router-dom';

function AdminDoctorDetailsPage() {
    const { id } = useParams();
  return (
    <div>
      <AdminHeader />
      <AdminDoctorDetails doctorId = { id } />
        {/* <Footer /> */}
    </div>
  )
}

export default AdminDoctorDetailsPage
