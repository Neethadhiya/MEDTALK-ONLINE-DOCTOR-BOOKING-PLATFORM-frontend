import React from 'react'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
import MakePayment from '../../Components/Role/Patient/MakePayment/MakePayment'
import { useParams } from 'react-router-dom';

function MakePaymentPage() {
  const {id} = useParams()
  return (
    <div>
       <PatientHeader />
       <MakePayment appointmentId = { id }/>
    </div>
  )
}

export default MakePaymentPage
