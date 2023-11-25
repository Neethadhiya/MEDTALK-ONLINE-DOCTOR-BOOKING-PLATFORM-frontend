import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
// import CustomButton from '../../../Helpers/CustomButton';
import { useSelector } from "react-redux";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import "./AdminDashboard.css";
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import { baseUrl } from "../../../../utils/constants";
import GroupIcon from "@mui/icons-material/Group";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import adminAxiosInstance from "../../../../Axios/AdminAxios";
import { BarChart } from "@mui/x-charts/BarChart";

function AdminDashboard() {
  const defaultTheme = createTheme();
  const [months, setMonthsData] = useState([]);
  const [income, setIncomeData] = useState([]);
  const [appointmentCount,setAppointmentCount] = useState('')
  const fetchData = () => {
    adminAxiosInstance
      .get(`get_admin_chart/`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data) {
          setMonthsData(response.data.months || []);
          setIncomeData(response.data.admin_fees || []);
          setAppointmentCount(response.data.appointment_count)
        } else {
          // Handle the case where the response data is empty or undefined
          console.error("API response data is empty or undefined.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app">
      <Sidebar
        className="sidebar"
        style={{ gridTemplateColumns: "repeat(12, 1fr)" }}
      >
        <div
          className="logo-container"
          style={{
            gridColumn: "span 12",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "200px",
            height: "200px",
            // marginTop :'-30px',
          }}
        >
          <img src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1694527647/aa_dewrsx.png" />
        </div>
        <Typography sx={{ marginLeft: "60px", marginBottom: "10px" }}>
          <strong>Admin</strong>
        </Typography>

        <Menu>
          <SubMenu label="Doctors" icon={<GroupIcon />}>
            <MenuItem icon={<GroupIcon />}>
              <Link to={"/admin/doctors"} style={{ textDecoration: "none" }}>
                Doctors List
              </Link>
            </MenuItem>
          </SubMenu>

          <SubMenu label="Patients" icon={<PeopleOutlineIcon />}>
            <MenuItem icon={<PeopleOutlineIcon />}>
              <Link to={"/admin/patients"} style={{ textDecoration: "none" }}>
                Patient List
              </Link>
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <Container maxWidth="xl" style={{ marginTop: "0px" }}>
      <Grid container spacing={2}>
            <Grid item xs={5} md={5}>
              <Card sx={{ minWidth: 275 }}>
              <CardContent sx={{textAlign:'center'}}>
                <h3>Total Appointments</h3>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                <strong>{appointmentCount}</strong>
                </Typography>
              </CardContent>
            </Card>
            </Grid>
          </Grid>
        <h2 style={{ color: "#0d9eb5" }}> Monthly Income</h2>
        <div style={{ marginBottom: "30px" }}>
          {months.length > 0 && income.length > 0 && (
            <BarChart
              xAxis={[{ scaleType: "band", data: months }]}
              series={[{ data: income }]}
              width={500}
              height={300}
              yAxis={[
                {
                  label: "Income (in ₹)", // Set the label for the y-axis
                },
              ]}
            />
          )}
        </div>
      </Container>
    </div>
  );
}

export default AdminDashboard;
