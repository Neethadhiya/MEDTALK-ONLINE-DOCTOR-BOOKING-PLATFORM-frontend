import React, { useState, useEffect } from "react";
import patientAxiosInstance from "../../../Axios/PatientAxios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomButton from "../../Helpers/CustomButton";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

function ViewPatientProfile() {
  const [patient, setPatient] = useState("");
  const fetchData = () => {
    patientAxiosInstance
      .get(`view_patient_profile_dashboard/`)
      .then((response) => {
        setPatient(response.data.patient);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
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

        {patient ? (
          <Card sx={{ maxWidth: 645, color: "gray", marginBottom: "70px" }}>
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
                  <Typography variant="body1">{patient.first_name}</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    <strong>Email</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="body1">{patient.email}</Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="subtitle1" sx={{ color: "black" }}>
                    <strong>Mobile</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} md={6}>
                  <Typography variant="body1">{patient.mobile}</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <p>Loading your details</p>
        )}
      </Box>
    </Container>
  );
}

export default ViewPatientProfile;
