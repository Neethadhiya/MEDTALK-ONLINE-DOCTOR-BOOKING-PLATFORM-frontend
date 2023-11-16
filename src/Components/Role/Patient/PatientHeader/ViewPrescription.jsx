import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import patientAxiosInstance from "../../../../Axios/PatientAxios";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CustomButton from "../../../Helpers/CustomButton";
import CssBaseline from "@mui/material/CssBaseline";

function ViewPrescription({id}) {
  const dispatch = useDispatch();
  const [prescription, setPrescription] = useState(null);
  const [prescriptionDate, setPrescriptionDate] = useState("");

  const { patientInfo } = useSelector((state) => state.auth);
  const patient_id = patientInfo.id;
  const fetchData = () => {
    patientAxiosInstance
      .get(`view_patient_prescription/${id}/`)
      .then((response) => {
        setPrescription(response.data.prescription_data);
        const originalPrescriptionDate =
          response.data.prescription_data.created_at;
        const prescriptionDate = new Date(originalPrescriptionDate);
        const day = prescriptionDate.getDate().toString().padStart(2, "0");
        const month = (prescriptionDate.getMonth() + 1)
          .toString()
          .padStart(2, "0");
        const year = prescriptionDate.getFullYear().toString().slice(-2);
        const formattedPrescriptionDate = `${day}-${month}-${year}`;

        setPrescriptionDate(formattedPrescriptionDate);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  return (
    
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop:'20px'
          }}
        >
          <Avatar sx={{ bgcolor: "#0d9eb5" }}>
            <LockOutlinedIcon />
          </Avatar>
          <h2 style={{ color: "#0d9eb5" }}> Prescription</h2>

          {prescription ? (
            <Card
              sx={{ maxWidth: 645, color: "gray", border: "solid #0d9eb5" }}
            >
              <CardContent>
                <Grid
                  container
                  spacing={2}
                  sx={{ marginLeft: { md: "35px", xs: "10px" } }}
                >
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Appointment Date</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1">{prescriptionDate}</Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Doctor's Name</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1">
                      Dr. {prescription.doctor_name}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Doctor's Email</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1">
                      {prescription.doctor_email}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Instructions</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1">
                      {prescription.instructions}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Comments</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="body1">
                      {prescription.comments}
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <Typography variant="subtitle1" sx={{ color: "black" }}>
                      <strong>Medicines</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    {prescription.medicines.map((medicine) => (
                      <di key={medicine.id}>
                        <li variant="body1">{medicine.medicine_name}</li>
                      </di>
                    ))}
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
         
              </CardActions>
            </Card>
          ) : (
            <img src='https://res.cloudinary.com/da4bmqkkz/image/upload/v1699964827/vv_uo301s.jpg' width='100%' height='100%' />

          )}
        </Box>
      </Container>
    </div>
  );
}

export default ViewPrescription;
