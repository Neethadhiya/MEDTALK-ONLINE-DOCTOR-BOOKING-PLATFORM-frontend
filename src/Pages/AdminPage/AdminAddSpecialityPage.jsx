import React from 'react';
import AdminHeader from '../../Components/Role/Admin/AdminHeader/AdminHeader';
import AdminSidebar from '../../Components/Role/Admin/AdminSidebar/AdminSidebar';
import AddSpeciality from '../../Components/Role/Admin/Add Speciality/AddSpeciality';
import './AdminAddSpecialityPage.css';

function AdminAddSpecialityPage() {
  return (
    <div>
      <AdminHeader />
      <div className="admin-page-container">
        <AdminSidebar />
        <div className="add-speciality-container">
          <AddSpeciality />
        </div>
      </div>
    </div>
  );
}

export default AdminAddSpecialityPage;
