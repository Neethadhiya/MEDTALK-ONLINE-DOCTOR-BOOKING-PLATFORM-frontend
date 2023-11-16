import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import ToastProvider from './Components/Helpers/ToastProvider'
import RegisterPage from './Pages/Accounts/RegisterPage'
import OTPVerificationPage from './Pages/Accounts/OTPVerificationPage'
import LoginPage from './Pages/Accounts/LoginPage'
import ForgotPasswordPage from './Pages/Accounts/ForgotPasswordPage'
import ResetPasswordPage from './Pages/Accounts/ResetPasswordPage'
import IndexPage from './Pages/Accounts/IndexPage'
import DoctorDashboardPage from './Pages/DoctorPage/DoctorDashboardPage'
import PatientDashboardPage from './Pages/PatientPage/PatientDashboardPage'
import Auth from './ProtectedRoute/Auth'
import UnAuth from './ProtectedRoute/UnAuth'
import DoctorProfilePage from './Pages/DoctorPage/DoctorProfilePage'
import AdminDashboardPage from './Pages/AdminPage/AdminDashboardPage'
import AdminDoctorListPage from './Pages/AdminPage/AdminDoctorListPage'
import AdminPatientListPage from './Pages/AdminPage/AdminPatientListPage'
import AdminDoctorDetailsPage from './Pages/AdminPage/AdminDoctorDetailsPage'
import PatientRecordsPage  from './Pages/DoctorPage/PatientRecordsPage'
import AdminAddSpecialityPage from './Pages/AdminPage/AdminAddSpecialityPage'
import FindDoctorsPage from './Pages/PatientPage/FindDoctorsPage'
import VideoConsultTimeSlotPage from './Pages/DoctorPage/VideoConsultTimeSlotPage'
import CheckAvailabiltyPage from './Pages/PatientPage/CheckAvailabiltyPage'
import VideoViewAllPage from './Pages/DoctorPage/VideoViewAllPage'
import MakePaymentPage from './Pages/PatientPage/MakePaymentPage'
import StripePaymentPage from './Pages/PatientPage/StripePaymentPage'
import CompletionPage from './Pages/PatientPage/CompletionPage'
import ViewAppoinmentDetailsPage from './Pages/DoctorPage/ViewAppoinmentDetailsPage'
import TodaysVideoConsultPage from './Pages/DoctorPage/TodaysVideoConsultPage'
import PatientProfilePage from './Pages/PatientPage/PatientProfilePage'
import Room from '../src/Components/Role/Patient/VideoCall/Room'
import VideoCalls from '../src/Components/Role/Doctor/VideoCall/VideoCalls'
import ViewAllAppointmentsPage from './Pages/DoctorPage/ViewAllAppointmentsPage'
import ViewAllAppoinmentDetailsPage from './Pages/DoctorPage/ViewAllAppoinmentDetailsPage'
import AddPrescriptionPage from './Pages/DoctorPage/AddPrescriptionPage'
import DoctorProfileViewPage from './Pages/DoctorPage/DoctorProfileViewPage'
import DoctorProfileEditPage from './Pages/DoctorPage/DoctorProfileEditPage'
import ViewPrescriptionPage from './Pages/PatientPage/ViewPrescriptionPage'

function App() {
  return (
    <div>
      <Router>
        <ToastProvider>
          <Routes>
          <Route path = '/' element = {<IndexPage />} />
            <Route element = {<UnAuth />} >
              <Route path ="register" element={<RegisterPage />} />
              <Route path = "otp_verification" element = {<OTPVerificationPage />} />
              <Route path = 'login' element = {<LoginPage />} />
              <Route path = 'forgot_password' element = {<ForgotPasswordPage />} />
              <Route path = "reset_password/:token" element = {<ResetPasswordPage />} />
            </Route>

            <Route path='/patient' element = {<Auth />}>
              <Route index path = '' element = {<PatientDashboardPage />} />
              <Route path = 'find_doctors' element = {<FindDoctorsPage />} />
              <Route path = 'check_availability/:id' element = {<CheckAvailabiltyPage />} />
              <Route path = 'make_payment/:id' element = {<MakePaymentPage />} />
              <Route path = "stripe_payment/:id" element={<StripePaymentPage />} />
              <Route path = "completion" element={<CompletionPage />} />
              <Route path = "patient_profile/:id" element={<PatientProfilePage />} />
              <Route path = 'room/:roomId' element={<Room />} />
              <Route path = "view_prescription/:id" element={<ViewPrescriptionPage />} />
            </Route>

            <Route path ='/doctor' element = {<Auth />}>
              <Route index path = '' element = {<DoctorDashboardPage />} />
              <Route  path = 'create_doctor_profile' element = {<DoctorProfilePage />} />
              <Route  path = 'patient_records' element = {<PatientRecordsPage />} />
              <Route  path = 'video_consult_timeslot' element = {<VideoConsultTimeSlotPage />} />
              <Route  path = 'video_view_all' element = {<VideoViewAllPage />} />
              <Route  path = 'todays_video_consult' element = {<TodaysVideoConsultPage />} />
              <Route path = "view_appointment_details/:id" element={<ViewAppoinmentDetailsPage />} />
              <Route path = "view_all_appointment_details/:id" element={<ViewAllAppoinmentDetailsPage />} />
              <Route path= "video_calls/:id" element={<VideoCalls />} />
              <Route  path = 'view_all_appoinments' element = {<ViewAllAppointmentsPage />} />
              <Route  path = 'view_doctors_profile_dashboard' element = {<DoctorProfileViewPage />} />
              <Route  path = 'edit_doctors_profile_dashboard' element = {<DoctorProfileEditPage />} />
              <Route path = "add_prescription/:id" element={<AddPrescriptionPage />} />
            </Route>

            <Route  path = '/admin' element = {<Auth />}>
              <Route  index path = '' element = {<AdminDashboardPage />} />
              <Route path = 'doctors' element = {<AdminDoctorListPage />} />
              <Route path = 'patients' element = {<AdminPatientListPage />} />
              <Route path = 'view_doctor_details/:id' element = {<AdminDoctorDetailsPage />} />
              <Route path = 'add_speciality' element = {<AdminAddSpecialityPage />} />
            </Route>

          </Routes>
        </ToastProvider>
      </Router>
    </div>
  
  )
}

export default App
