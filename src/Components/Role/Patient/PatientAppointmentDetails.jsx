import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import patientAxiosInstance from "../../../Axios/PatientAxios";
import { baseUrl } from "../../../utils/constants";
import CustomButton from "../../Helpers/CustomButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function PatientAppointmentDetails() {
  const { patientInfo } = useSelector((state) => state.auth);
  const [appointments, setAppointment] = useState("");
  const [openPrescription, setOpenPrescription] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [appointmentId, setAppointmentId] = useState("")
 
  const viewPrescription = () => {
    setOpenPrescription(true);
  };
  const patient_id = patientInfo.id;
  const fetchData = () => {
    patientAxiosInstance
      .get(`view_patient_appointment_details/`)
      .then((response) => {
        setAppointment(response.data.appointments);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [patient_id]);
  const handleCancelOpen = (id,date,time) => {
    
    setAppointmentId(id);
    setOpen(true);
   
  };

  const handleClose = () => {
    setOpen(false);
  };
  const confirmCancel = () => {
    handleClose();
    
      const payload = {
        id: appointmentId,
      };
   
   
    patientAxiosInstance
      .delete("user_cancel_appointment/", { data: payload })
      .then((response) => {
        toast.success(response.data.message);
             
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error on canceling the appointment:", error);
      });
  };

  return (
    <Grid container spacing={2}>
       <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Appointment Confirmation"}</DialogTitle>
        <DialogContent>
       
            <div>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to confirm your appointment.
              </DialogContentText>
              <img
                src="data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130.2 130.2'%3E%3Ccircle class='path circle' fill='none' stroke='%2373AF55' stroke-width='6' stroke-miterlimit='10' cx='65.1' cy='65.1' r='62.1'/%3E%3Cpolyline class='path check' fill='none' stroke='%2373AF55' stroke-width='6' stroke-linecap='round' stroke-miterlimit='10' points='100.2,40.2 51.5,88.8 29.8,67.5 '/%3E%3C/svg%3E"
                alt="Checkmark"
                style={{
                  width: "80px",
                  display: "block",
                  margin: "40px auto 0",
                }}
              />
            </div>
         
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={confirmCancel} style={{ width: "200px" }}>
            Confirm
          </CustomButton>
          <CustomButton onClick={handleClose} style={{ width: "200px" }}>
            Cancel
          </CustomButton>
        </DialogActions>
      </Dialog>
      <h2 style={{ color: "#0d9eb5", display: "flex", alignItems: "center" }}>
        Appointment Details
        <img
          src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1696585644/ifollowups_1_guchla.svg"
          alt="Appointment Icon"
          style={{ marginLeft: "10px", width: "30px" }}
        />
      </h2>

      {appointments.length > 0 ? (
        appointments.map((appointment) => (
          <Grid item xs={12} key={appointment.id}>
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                 
                  <div style={{ marginLeft: "10px" }}>
                    <h5 style={{ color: "#0d9eb5" }}>
                      Appointment at{" "}
                      {new Date(appointment.selected_date).toLocaleDateString(
                        "en-GB"
                      )}
                    </h5>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{ color: "black", fontSize: "14px" }}
                        >
                          <strong>Doctor Name</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          Dr. {appointment.doctor_name}
                        </Typography>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{ color: "black", fontSize: "14px" }}
                        >
                          <strong>Doctor's Email</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          {appointment.doctor_email}
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography
                          component="div"
                          sx={{ color: "black", fontSize: "14px" }}
                        >
                          <strong>Specialization</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          {appointment.doctor_specialization}
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography sx={{ color: "black", fontSize: "14px" }}>
                          <strong>Qualification</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          {appointment.doctor_qualification}
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography sx={{ color: "black", fontSize: "14px" }}>
                          <strong>Experience</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          {appointment.doctor_experience} years experience
                          overall
                        </Typography>
                      </div>
                    </div>
                    {appointment.consultation_type == "Chat" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "230px",
                          }}
                        >
                          <Typography sx={{ color: "black", fontSize: "14px" }}>
                            <strong>Chat Consult Fees</strong>
                          </Typography>
                        </div>
                        <div>
                          <Typography component="div" sx={{ fontSize: "14px" }}>
                            {appointment.doctor_chat_fees}
                          </Typography>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            width: "230px",
                          }}
                        >
                          <Typography sx={{ color: "black", fontSize: "14px" }}>
                            <strong>Video Consult Fee</strong>
                          </Typography>
                        </div>
                        <div>
                          <Typography component="div" sx={{ fontSize: "14px" }}>
                            {appointment.doctor_online_fees}
                          </Typography>
                        </div>
                      </div>
                    )}

          

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography sx={{ color: "black", fontSize: "14px" }}>
                          <strong>Time</strong>
                        </Typography>
                      </div>
                      <div>
                        <Typography component="div" sx={{ fontSize: "14px" }}>
                          {appointment.time}
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography sx={{ color: "black", fontSize: "14px" }}>
                          <strong>Appointment Status</strong>
                        </Typography>
                      </div>
                      <div>
                      
                        <Typography component="div" 
                        sx={{ fontSize: "14px" ,
                        color: appointment.status === 'Canceled' ? 'red' : 'inherit', }}>
                          <strong>{appointment.status}</strong>
                        </Typography>
                      </div>
                    </div>

                    {appointment.payment_status ? (
                      <>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "230px",
                            }}
                          >
                            {/* <Typography
                              sx={{ color: "black", fontSize: "14px" }}
                            >
                              <strong>Payment id</strong>
                            </Typography> */}
                          </div>
                          {/* <div>
                            <Typography
                              component="div"
                              sx={{ fontSize: "14px" }}
                            >
                              {appointment.payment.stripe_id}
                            </Typography>
                          </div> */}
                        </div>

                        <div style={{ display: "flex", alignItems: "center" }}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              width: "230px",
                            }}
                          >
                            <Typography
                              sx={{ color: "black", fontSize: "14px" }}
                            >
                              <strong>Payment Method</strong>
                            </Typography>
                          </div>
                          <div>
                            <Typography
                              component="div"
                              sx={{ fontSize: "14px" }}
                            >
                              Stripe Payment
                            </Typography>
                          </div>
                        </div>
                      </>
                    ) : null}

                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          width: "230px",
                        }}
                      >
                        <Typography sx={{ color: "black", fontSize: "14px" }}>
                          <strong>Payment Status</strong>
                        </Typography>
                      </div>
                      <div>
                        {appointment.payment_status ? (
                          <Typography
                            component="div"
                            sx={{ fontSize: "14px", 
                            color:  "green" }}
                          >
                            <strong>Completed</strong>
                          </Typography>
                        ) : (
                          <Typography
                            component="div"
                            sx={{ fontSize: "14px", color: "red" }}
                          >
                            {appointment.status === 'Canceled' ? 
                            <strong>Payment added to wallet</strong>:
                            <strong>Pending</strong>}
                          </Typography>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>
               
                {appointment.status === 'Canceled'? 
                 <div style={{width:'220px'}}>
                 <CustomButton sx={{color:'white',backgroundColor:'red'}} onClick={() => handleCancelOpen(appointment.id, appointment.selected_date, appointment.time)}>
                   Canceled
                 </CustomButton>
                 </div> :<>
                <div style={{width:'220px'}}>
                
                  <CustomButton onClick={() => handleCancelOpen(appointment.id, appointment.selected_date, appointment.time)}>
                    Cancel Appointment
                  </CustomButton>
                  </div>
                <Link to={`/patient/view_prescription/${appointment.id}`}>
                  <CustomButton onClick={viewPrescription}>
                    View Prescription
                  </CustomButton>
                </Link></>
                }
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <p>Loading</p>
        </Grid>
      )}
    </Grid>
  );
}

export default PatientAppointmentDetails;
