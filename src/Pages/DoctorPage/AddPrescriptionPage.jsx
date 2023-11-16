import React from 'react'
import DoctorHeader from '../../Components/Role/Doctor/DoctorHeader/DoctorHeader'
import AddPrescription from '../../Components/Role/Doctor/AddPrescription'
import { useParams } from 'react-router-dom'

function AddPrescriptionPage() {
    const {id} = useParams()
  return (
    <div>
        <DoctorHeader />
        <AddPrescription id = {id} />
      
    </div>
  )
}

export default AddPrescriptionPage
