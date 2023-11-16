import React from 'react'
import DoctorHeader from '../../Components/Role/Doctor/DoctorHeader/DoctorHeader'
import PatientRecords from '../../Components/Role/Doctor/PatientRecords'

function PatientRecordsPage() {
  return (
    <div>
         <DoctorHeader />
         <PatientRecords />
    </div>
  )
}

export default PatientRecordsPage
