import React from 'react'
import AdminHeader from '../../Components/Role/Admin/AdminHeader/AdminHeader'
// import Footer from '../../Components/Account Component/Footer/Footer'
import AdminPatientList from '../../Components/Role/Admin/AdminPatientList'

function AdminPatientListPage() {
  return (
    <div>
      <AdminHeader />
            <AdminPatientList />
        {/* <Footer /> */}
    </div>
  )
}

export default AdminPatientListPage
