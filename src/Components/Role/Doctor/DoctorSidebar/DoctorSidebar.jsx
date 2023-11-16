import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CustomButton from "../../../Helpers/CustomButton";
import { useSelector } from "react-redux";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  useProSidebar,
} from "react-pro-sidebar";
import "./DoctorSidebar.css";
import { Routes, Route, Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit";
import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import PersonIcon from "@mui/icons-material/Person";
import { baseUrl } from "../../../../utils/constants";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import VideocamIcon from "@mui/icons-material/Videocam";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import MarkChatUnreadIcon from "@mui/icons-material/MarkChatUnread";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

function DoctorSidebar() {
  const defaultTheme = createTheme();
  const { name } = useSelector((state) => state.auth.doctorInfo);
  const { doctorInfo } = useSelector((state) => state.auth);
  const id = doctorInfo.id;
  const [isDoctor, setIsDoctor] = useState(false);
  //   const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [Image, setProfileImage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false); //   const { collapsed, handleToggleSidebar } = useProSidebar();
  const [profileCreated, setProfileCreated] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const fetchData = async () => {
    try {
      const response = await doctorAxiosInstance.post(`show_is_doctor/${id}/`);
      setProfileCreated(response.data.profile_created);
      setIsDoctor(response.data.doctor.is_doctor);
      setProfileImage(response.data.doctor.doctor_data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div>
        <IconButton
          onClick={toggleSidebar} // Toggle the drawer when the button is clicked
          sx={{
            alignSelf: "center",
            marginLeft: "auto",
            marginRight: "10px",
          }}
        >
          <MenuIcon /> {/* Use MenuIcon here */}
        </IconButton>
        {/* <Sidebar className="sidebar" style={{ gridTemplateColumns: 'repeat(12, 1fr)' }} */}
        <div className={`sidebar ${showSidebar ? "active" : ""}`}>
          <Sidebar>
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
              {!Image ? (
                <img
                  src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1694527647/aa_dewrsx.png"
                  alt="Doctor"
                  style={{
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <img
                  src={`${baseUrl}${Image.profileImage}`}
                  alt="Doctor"
                  style={{
                    width: "170px",
                    height: "170px",
                    borderRadius: "50%",
                  }}
                />
              )}
            </div>
            <Typography sx={{ marginLeft: "60px", marginBottom: "10px" }}>
              <strong>Dr. {name}</strong>
            </Typography>

            {!isDoctor ? (
              <Link
                to="/doctor/create_doctor_profile"
                style={{ textDecoration: "none" }}
              >
                <CustomButton disabled={profileCreated}>
                  {" "}
                  Create Profile{" "}
                </CustomButton>
              </Link>
            ) : (
              <Menu>
                <SubMenu label="Profile" icon={<AccountCircleIcon />}>
                  <MenuItem icon={<PersonIcon />}>
                    <Link
                      to="/doctor/view_doctors_profile_dashboard"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View Profile
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<EditIcon />}>
                    <Link
                      to="/doctor/edit_doctors_profile_dashboard"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Edit Profile
                    </Link>
                  </MenuItem>
                </SubMenu>

                <SubMenu label="TimeSlot" icon={<HistoryToggleOffIcon />}>
                  <MenuItem icon={<MoreTimeIcon />}>
                    <Link
                      to="/doctor/video_consult_timeslot"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Add TimeSlot
                    </Link>
                  </MenuItem>
                </SubMenu>

                <SubMenu label="Appointments" icon={<LocalHospitalIcon />}>
                  <MenuItem icon={<MoreTimeIcon />}>
                    <Link
                      to="/doctor/view_all_appoinments"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View Appointments
                    </Link>
                  </MenuItem>
                </SubMenu>

                <SubMenu label="Video Consult" icon={<VideoCameraFrontIcon />}>
                  <MenuItem icon={<VideoChatIcon />}>
                    <Link
                      to="/doctor/todays_video_consult"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Today's Video Consult
                    </Link>
                  </MenuItem>
                  <MenuItem icon={<VideocamIcon />}>
                    <Link
                      to="/doctor/video_view_all"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      View All
                    </Link>
                  </MenuItem>
                </SubMenu>
              </Menu>
            )}
          </Sidebar>
        </div>
      </div>
    </>
  );
}

export default DoctorSidebar;
