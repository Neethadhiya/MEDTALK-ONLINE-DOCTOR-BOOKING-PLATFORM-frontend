import React, { useEffect, useState } from "react";
import doctorAxiosInstance from "../../../Axios/DoctorAxios";
import DoctorSidebar from "../Doctor/DoctorSidebar/DoctorSidebar";

import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from 'react-redux';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { baseUrl } from "../../../utils/constants";
import CustomButton from "../../Helpers/CustomButton";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import LinearColor from "../../Loader/CircleLoader";

function DoctorProfileView() {
  const [doctor, setDoctor] = useState(null);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleOpen = (certificateUrl) => {
    setSelectedCertificate(certificateUrl);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    setLoading(true);
    doctorAxiosInstance
      .get(`view_doctor_profile_dashboard/`)
      .then((response) => {
        setDoctor(response.data.doctor);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app" style={{ marginTop: "60px", marginBottom: "20px" }}>
      <DoctorSidebar />
      {loading ? ( // Conditionally render loader if loading is true
      <div style={{marginTop:'300px'}}>
        <LinearColor />
      </div>
      
    ) : (
      <Container component="main" maxWidth="xs">
        <CssBaseline />

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
          <h2 style={{ color: "#0d9eb5" }}>My Profile</h2>

          {doctor ? (
            <Card sx={{ maxWidth: 645, color: "gray", marginBottom: "70px" }}>
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
                    <Typography variant="body1">{doctor.user_email}</Typography>
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
                    <Typography variant="body1">{doctor.chat_fees}</Typography>
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
            </Card>
          ) : (
            <p>Loading your details</p>
          )}
        </Box>
      </Container>
       )}
    </div>
  );
}

export default DoctorProfileView;
