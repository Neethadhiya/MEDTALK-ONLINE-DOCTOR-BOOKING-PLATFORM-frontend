import React from 'react'
import AdminHeader from '../../Components/Role/Admin/AdminHeader/AdminHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import AdminDoctorList from '../../Components/Role/Admin/AdminDoctorList/AdminDoctorList'

function AdminDoctorListPage() {
  return (
    <div>
      <AdminHeader />
            <AdminDoctorList />
            {/* <Footer /> */}

    </div>
  )
}

export default AdminDoctorListPage
