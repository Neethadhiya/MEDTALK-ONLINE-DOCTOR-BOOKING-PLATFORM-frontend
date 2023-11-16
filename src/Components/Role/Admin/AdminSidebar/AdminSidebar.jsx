import React from "react";
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
import "./AdminSidebar.css";
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
import AddCircleIcon from "@mui/icons-material/AddCircle";

function AdminSidebar() {
  const defaultTheme = createTheme();
  // const {name} = useSelector((state)=>state.auth.doctorInfo)

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
    </div>
  );
}

export default AdminSidebar;
