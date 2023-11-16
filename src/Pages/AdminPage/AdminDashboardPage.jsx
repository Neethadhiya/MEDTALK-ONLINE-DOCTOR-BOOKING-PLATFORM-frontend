import React from 'react'
import AdminHeader from '../../Components/Role/Admin/AdminHeader/AdminHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import AdminDashboard from '../../Components/Role/Admin/AdminDashboard/AdminDashboard'

function AdminDashboardPage() {
  return (
    <div>
        <AdminHeader />
            <AdminDashboard />
        {/* <Footer /> */}
    </div>
  )
}

export default AdminDashboardPage
