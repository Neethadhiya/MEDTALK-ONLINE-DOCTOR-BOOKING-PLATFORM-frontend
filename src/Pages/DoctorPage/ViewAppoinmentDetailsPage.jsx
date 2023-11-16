import React from 'react'
import DoctorHeader from '../../Components/Role/Doctor/DoctorHeader/DoctorHeader'
import ViewAppoinmentDetails from '../../Components/Role/Doctor/ViewAppoinmentDetails/ViewAppoinmentDetails'
import { useParams } from 'react-router-dom'

function ViewAppoinmentDetailsPage() {
  const {id} = useParams()
  return (
    <div>
       <DoctorHeader />
       <ViewAppoinmentDetails  id = {id} />
    </div>
  )
}

export default ViewAppoinmentDetailsPage


