import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import patientAxiosInstance from "../../Axios/PatientAxios";
import { baseUrl } from "../../utils/constants";
import CustomButton from "../Helpers/CustomButton";

function FindDoctorsList() {
  const [doctorsList, setDoctorsList] = useState([]);

  const fetchData = () => {
    patientAxiosInstance
      .get("show_doctor_list/")
      .then((response) => {
        setDoctorsList(response.data.doctors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Grid container spacing={2}>
      {doctorsList.length > 0 ? (
        doctorsList.map((doctor) => (
          <Grid item xs={12} key={doctor.id}>
            <Typography
              variant="h5"
              component="div"
              sx={{ textAlign: "center", marginBottom: "30px" }}
            >
              Available doctors
            </Typography>
            <Card>
              <CardContent
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={`${baseUrl}${doctor.profileImage}`} // Replace with your image URL
                  alt={doctor.user.first_name}
                  style={{ width: "100px" }}
                />
                <div style={{ textAlign: "center", marginTop: "10px" }}>
                  <Typography variant="h5" component="div">
                    Dr. {doctor.user.first_name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {doctor.specialization}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.experience} years experience overall
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.location}, {doctor.city}
                  </Typography>
                </div>
                <div style={{ marginTop: "auto" }}>
                  <CustomButton style={{ width: "200px" }}>
                    Book Now
                  </CustomButton>
                </div>
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

export default FindDoctorsList;
