import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import adminAxiosInstance from "../../../Axios/AdminAxios";
import { baseUrl } from "../../../utils/constants";
import CustomButton from "../../Helpers/CustomButton";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Loader from "../../../Components/Loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const defaultTheme = createTheme();
function AdminDoctorDetails({ doctorId }) {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [clockOpen, setClickOpen] = useState(false);
  const [reject, setreject] = useState(false);

  const fetchData = () => {
    adminAxiosInstance
      .post(`view_doctor_details/${doctorId}/`)
      .then((response) => {
        setDoctor(response.data.doctor);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [doctorId]);
  const handleOpen = (certificateUrl) => {
    setSelectedCertificate(certificateUrl);
    setOpen(true);
  };

  const handleClickOpen = () => {
    setreject(true);
    setClickOpen(true);
  };
  const handleApproveOpen = () => {
    setreject(false);
    setClickOpen(true);
  };

  const handleClickClose = () => {
    setClickOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleApprove = () => {
    handleClickClose();
    setIsLoading(true);
    adminAxiosInstance
      .post(`approve_doctor/${doctorId}/`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/doctors");
          console.log(response.data.doctors, "ssssssssssssss");
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while making the request.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReject = () => {
    setIsLoading(true);
    handleClickClose();
    adminAxiosInstance
      .post(`reject_doctor/${doctorId}/`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/doctors");
          toast.error(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while making the request.");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={clockOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClickClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {reject ? "Reject Doctor Request" : "Approve Doctor Request"}
        </DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText id="alert-dialog-slide-description">
              {reject
                ? "Are you sure you want to reject doctor request?"
                : "Are you sure you want to approve doctor request?"}
            </DialogContentText>
            {!reject && (
              <img
                src="data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130.2 130.2'%3E%3Ccircle class='path circle' fill='none' stroke='%2373AF55' stroke-width='6' stroke-miterlimit='10' cx='65.1' cy='65.1' r='62.1'/%3E%3Cpolyline class='path check' fill='none' stroke='%2373AF55' stroke-width='6' stroke-linecap='round' stroke-miterlimit='10' points='100.2,40.2 51.5,88.8 29.8,67.5 '/%3E%3C/svg%3E"
                alt="Checkmark"
                style={{
                  width: "80px",
                  display: "block",
                  margin: "40px auto 0",
                }}
              />
            )}
          </div>
        </DialogContent>
        <DialogActions>
          {reject ? (
            <CustomButton onClick={handleReject} style={{ width: "200px" }}>
              Confirm
            </CustomButton>
          ) : (
            <CustomButton onClick={handleApprove} style={{ width: "200px" }}>
              Confirm
            </CustomButton>
          )}
          <CustomButton onClick={handleClickClose} style={{ width: "200px" }}>
            Cancel
          </CustomButton>
        </DialogActions>
      </Dialog>
      {isLoading ? (
        <Loader />
      ) : (
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 9,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0d9eb5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <h2 style={{ color: "#0d9eb5" }}> Doctor Details</h2>

            {doctor ? (
              <Card sx={{ maxWidth: 645, color: "gray" }}>
                <CardMedia
                  sx={{
                    width: "200px",
                    height: "200px",
                    overflow: "hidden",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: { md: "105px", xs: "72px" },
                    marginTop: "-16px",
                    marginBottom: "-30px",
                  }}
                >
                  <img
                    src={`${baseUrl}${doctor.profileImage}`}
                    alt="Doctor's Profile Image"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "70%",
                      objectFit: "cover",
                    }}
                  />
                </CardMedia>

                <CardContent>
                  <Grid
                    container
                    spacing={2}
                    sx={{ marginLeft: { md: "35px", xs: "10px" } }}
                  >
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Name</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        Dr. {doctor.user_first_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Email</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.user_email}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Mobile</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.user_mobile}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Gender</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">{doctor.gender}</Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Online Consultaion Fees</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.online_fees}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Chat Consultaion Fees</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.chat_fees}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Experience</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.experience} Years
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Qualification</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.qualification}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Specialization</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={6} md={6}>
                      <Typography variant="body1">
                        {doctor.specialization}
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ marginLeft: "105px", color: "black" }}
                    >
                      <Typography variant="subtitle1" sx={{ color: "black" }}>
                        <strong>Certificates</strong>
                      </Typography>
                    </Grid>
                    <Grid container spacing={2}>
                      {doctor.documentImages.map((image, index) => (
                        <Grid item xs={6} md={6} key={index}>
                          <Typography
                            variant="subtitle1"
                            sx={{ marginLeft: "20px" }}
                          >
                            Certificate {index + 1}
                          </Typography>
                          <img
                            src={`${baseUrl}${image.documents}`}
                            alt={`Certificate ${index + 1}`}
                            style={{
                              width: "90px",
                              height: "90px",
                              marginLeft: "20px",
                            }}
                            onClick={() =>
                              handleOpen(`${baseUrl}${image.documents}`)
                            }
                          />
                          <Modal
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                              timeout: 500,
                            }}
                          >
                            <Fade in={open}>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height: "100%",
                                }}
                              >
                                {selectedCertificate && (
                                  <img
                                    src={selectedCertificate}
                                    alt="Selected Certificate"
                                    style={{
                                      maxWidth: "100%",
                                      maxHeight: "100%",
                                      margin: "auto",
                                    }}
                                  />
                                )}
                              </div>
                            </Fade>
                          </Modal>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <CustomButton onClick={handleApproveOpen}>
                    Approve
                  </CustomButton>

                  <CustomButton onClick={handleClickOpen}>Reject</CustomButton>
                </CardActions>
              </Card>
            ) : (
              <p>Loading your details</p>
            )}
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default AdminDoctorDetails;
