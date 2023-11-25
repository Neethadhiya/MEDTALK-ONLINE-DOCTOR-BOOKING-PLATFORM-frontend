import { Box, Tabs, Tab, Typography, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import CustomButton from "../../../Helpers/CustomButton";
import VideoCall from "../VideoCall/VideoCall";
import PatientPrescription from "../PatientHeader/ViewPrescription";
import PatientAppointmentDetails from "../../Patient/PatientAppointmentDetails";
import ViewPatientProfile from "../ViewPatientProfile";
import Wallet from "../Wallet";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PatientProfile() {
  const [value, setValue] = useState(0);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    handleMenuClose();
  };

  const handleMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <Box sx={{ width: "100%", marginTop: "90px" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", overflowX: "auto" }}>
        {window.innerWidth < 600 ? (
          <>
            <Tab label="Menu" onClick={handleMenuOpen} />
            <Menu
              anchorEl={menuAnchorEl}
              open={Boolean(menuAnchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleChange(null, 0)}>
                View Profile
              </MenuItem>

              <MenuItem onClick={() => handleChange(null, 1)}>
                Appointment Details
              </MenuItem>

              <MenuItem onClick={() => handleChange(null, 2)}>
                Wallet
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            scrollButtons="auto"
          >
            <Tab label="View Profile" {...a11yProps(0)} />
            <Tab label="Appointment Details" {...a11yProps(1)} />
            <Tab label="Wallet" {...a11yProps(2)} />

          </Tabs>
        )}
      </Box>
      <CustomTabPanel value={value} index={0}>
        <ViewPatientProfile />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <PatientAppointmentDetails />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <Wallet />
      </CustomTabPanel>
    </Box>
  );
}
