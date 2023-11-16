import React from 'react'
import { useParams } from 'react-router-dom'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
import ViewPrescription from '../../Components/Role/Patient/PatientHeader/ViewPrescription'

function ViewPrescriptionPage() {
    const {id} = useParams()
  return (
    <div>
      <PatientHeader />
      <ViewPrescription id= {id}/>
    </div>
  )
}

export default ViewPrescriptionPage
