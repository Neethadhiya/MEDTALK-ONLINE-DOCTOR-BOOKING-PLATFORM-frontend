import React from 'react'
import PatientHeader from '../../Components/Role/Patient/PatientHeader/PatientHeader'
import Payment from '../../Components/Role/Patient/StripePayment/Payment'
import { useParams } from 'react-router-dom'

function StripePaymentPage() {
    const {id} = useParams()
  return (
    <div>
       <PatientHeader />
        <Payment id= {id}/>
    </div>
  )
}

export default StripePaymentPage
