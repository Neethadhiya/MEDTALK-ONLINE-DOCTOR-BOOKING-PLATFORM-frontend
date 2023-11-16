import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { unSetRole } from "../../../../Redux/authSlices";
import { logout } from "../../../../Redux/authSlices";

import { persistor } from "../../../../Redux/Store";

const profile = ["Profile"];
const settings = ["Logout"];
const imageUrl =
  "https://res.cloudinary.com/da4bmqkkz/image/upload/v1694517078/logoo_daz8sk.png";
const styles = {
  image: {
    width: "35px",
    height: "35px",
    marginRight: "1px",
  },
};

function AdminHeader() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch();
  const { adminInfo } = useSelector((state) => state.auth);
  const name = adminInfo.name;
  const access_token = adminInfo.access_token;
  const [showProfile, setShowProfile] = useState(true);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("AdminAccessToken");
    localStorage.removeItem("AdminRefreshToken");
    dispatch(logout({ role: "Admin" }));
    dispatch(unSetRole({ role: null }));
    persistor.purge();
    setAnchorElUser(null);
    navigate("/");
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: "white" }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/admin"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },

              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#0d9eb5",
              textDecoration: "none",
            }}
          >
            <img src={imageUrl} alt="Logo" style={styles.image} />
            MedTalk
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/admin"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,

              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "#0d9eb5",
              textDecoration: "none",
            }}
          >
            <img src={imageUrl} alt="Logo" style={styles.image} />
            MedTalk
          </Typography>

          {access_token ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Typography sx={{ fontSize: { md: "14px", xs: "12px" } }}>
                    {name}
                  </Typography>

                  <Avatar alt="Remy Sharp" sx={{ m: 1, bgcolor: "#0d9eb5" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", color: "black" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClick={handleLogout}
              >
                <MenuItem>
                  <Link
                    style={{ textDecoration: "none" }}
                    onClick={handleLogout}
                  >
                    <Typography textAlign="center" sx={{ color: "grey" }}>
                      Logout
                    </Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <Link to="/register">
              <Button
                sx={{
                  fontSize: "14px",
                  textTransform: "capitalize",
                  color: "#0d9eb5",
                }}
              >
                Register / Login
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminHeader;
