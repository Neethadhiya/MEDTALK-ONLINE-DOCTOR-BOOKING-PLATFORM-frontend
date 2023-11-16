import React from 'react'
import DoctorHeader from '../../Components/Role/Doctor/DoctorHeader/DoctorHeader'
import ViewAllAppoinmentDetails from '../../Components/Role/Doctor/ViewAllAppoinmentDetails'
import { useParams } from 'react-router-dom'

function ViewAllAppoinmentDetailsPage() {
  const {id} = useParams()
  return (
    <div>
       <DoctorHeader />
       <ViewAllAppoinmentDetails  id = {id} />
    </div>
  )
}

export default ViewAllAppoinmentDetailsPage


