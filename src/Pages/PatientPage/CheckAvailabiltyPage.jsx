import React from 'react'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
import CheckAvailabilty from '../../Components/Role/Patient/CheckAvailabilty/CheckAvailabilty'
import { useParams } from 'react-router-dom'

function CheckAvailabiltyPage() {
  const { id } = useParams();
  return (
    <div>
        <PatientHeader />
        <CheckAvailabilty  doctorId = {id}/>
    </div>
  )
}

export default CheckAvailabiltyPage
