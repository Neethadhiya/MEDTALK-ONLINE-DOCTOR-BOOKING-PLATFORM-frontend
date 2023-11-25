import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../../Role/Doctor/DoctorSidebar/DoctorSidebar";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Loader from "../../../Loader/Loader";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CustomButton from "../../../Helpers/CustomButton";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultTheme = createTheme();
function ViewAppoinmentDetails({ id }) {
  const [appointmentData, setAppointmentData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [appoinmentId, setAppointmentId] = useState("");
  const [status, setStatus] = useState(false);

  const navigate = useNavigate();

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddPrescription = (id) => {
    navigate(`/doctor/add_prescription/${id}`);
  };

  const handleStartMeeting = () => {
    navigate(`/doctor/video_calls/${appoinmentId}`);
  };

  const fetchData = () => {
    doctorAxiosInstance
      .get(`view_appointment_details/${id}/`)
      .then((response) => {
        setAppointmentData(response.data.appointment);
        setAppointmentId(response.data.appointment.id);
        if (response.data.appointment.status === "New Appointment") {
          setStatus(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="app" style={{ minHeight: "120vh" }}>
      <DoctorSidebar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="md">
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{" Cancel Appointment"}</DialogTitle>
            <DialogContent>
              <div>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to cancel the appointment?
                </DialogContentText>
              </div>
            </DialogContent>
            <DialogActions>
              <CustomButton
                style={{ width: "200px" }}
              >
                Confirm
              </CustomButton>
              <CustomButton onClick={handleClose} style={{ width: "200px" }}>
                Cancel
              </CustomButton>
            </DialogActions>
          </Dialog>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0d9eb5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography sx={{ fontSize: "16px" }}>
              Video Consult Details
            </Typography>
            {appointmentData ? (
              <Card
                sx={{
                  maxWidth: 645,
                  color: "gray",
                  marginTop: "30px",
                  border: "solid #0d9eb5",
                }}
              >
                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginLeft: { md: "35px", xs: "10px" } }}
                  >
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Patient Name
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.user}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Consultation Type
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {
                          (appointmentData.consultation_type = "video_call"
                            ? "Video call"
                            : "Chat")
                        }
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Payment Status
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      {appointmentData.payment_status ? (
                        <Typography variant="body1" sx={{ color: "green" }}>
                          <strong>Completed</strong>
                        </Typography>
                      ) : (
                        <Typography variant="body1" sx={{ color: "red" }}>
                          <strong>Pending</strong>
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Mobile
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.mobile}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Date
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {new Date(
                          appointmentData.selected_date
                        ).toLocaleDateString("en-GB")}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Time
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.time}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Comments
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.comments}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Consultaion Fees
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {appointmentData.fees}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        Appointment Status
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      {appointmentData.status == "Canceled" ? (
                        <Typography variant="body1" sx={{ color: "red" }}>
                          {appointmentData.status}
                        </Typography>
                      ) : (
                        <Typography variant="body1">
                          {appointmentData.status}
                        </Typography>
                      )}
                    </Grid>
                    {appointmentData.status == "New Appointment" &&
                    appointmentData.payment_status ? (
                      
                        <Grid item xs={6} md={6}>
                          <CustomButton
                            style={{ width: "200px" }}
                            onClick={handleStartMeeting}
                          >
                            Start Meeting
                          </CustomButton>
                        </Grid>
                        ) : null}
                        <Grid item xs={6} md={6}>
                          <CustomButton
                            style={{ width: "200px" }}
                            onClick={() =>
                              handleAddPrescription(appointmentData.id)
                            }
                          >
                            Add Prescription
                          </CustomButton>
                        </Grid>
                        <Grid item xs={12} md={12}>
        
                        </Grid>
                     
                   
                  </Grid>
                </CardContent>
              </Card>
            ) : (
              <p>Loading your details</p>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default ViewAppoinmentDetails;
