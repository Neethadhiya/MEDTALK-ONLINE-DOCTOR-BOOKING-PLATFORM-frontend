import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CustomButton from "../../Helpers/CustomButton";
import { Formik } from "formik";
import RegisterValidationSchema from "../../Validation/RegisterValidationSchema";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./Register.css";
import { baseUrl } from "../../../utils/constants";
import publicInstance from "../../../Axios/PublicAxios";
import Loader from "../../Loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import LinearColor from "../../Loader/CircleLoader";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const initialValuesRegister = {
  Name: "",
  Email: "",
  Mobile: "",
  Password: "",
  ConfirmPassword: "",
};
function Register() {
  const defaultTheme = createTheme();
  const [role, setRole] = useState("Patient");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const changeDoctor = () => {
    setRole("Doctor");
    scrollToTop();
  };

  const changePatient = () => {
    setRole("Patient");
    scrollToTop();
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/otp_verification");
  };

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);

    localStorage.setItem("email", values.Email);
    const payload = {
      first_name: values.Name,
      email: values.Email,
      mobile: values.Mobile,
      password: values.Password,
      role: role,
    };
    try {
      resetForm();
      const response = await publicInstance.post("register/", payload);
      if (response.data) {
        setOpen(true);
      } else {
        toast.error("Registration Failed");
        console.log("Registration Failed");
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error :", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"OTP Verification"}</DialogTitle>
        <DialogContent>
          <div>
            <DialogContentText id="alert-dialog-slide-description">
              An OTP has been sent to your email. Please check your email inbox.
            </DialogContentText>
            <img
              src="data:image/svg+xml;charset=utf-8,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130.2 130.2'%3E%3Ccircle class='path circle' fill='none' stroke='%2373AF55' stroke-width='6' stroke-miterlimit='10' cx='65.1' cy='65.1' r='62.1'/%3E%3Cpolyline class='path check' fill='none' stroke='%2373AF55' stroke-width='6' stroke-linecap='round' stroke-miterlimit='10' points='100.2,40.2 51.5,88.8 29.8,67.5 '/%3E%3C/svg%3E"
              alt="Checkmark"
              style={{
                width: "80px",
                display: "block",
                margin: "40px auto 0",
              }}
            />
          </div>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <CustomButton onClick={handleClose} style={{ width: "200px" }}>
            Ok
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
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "80px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0d9eb5" }}>
              <LockOutlinedIcon />
            </Avatar>
            {role === "Doctor" ? (
              <Typography sx={{ fontSize: "16px" }}>
                Doctor Registration
              </Typography>
            ) : (
              <Typography sx={{ fontSize: "16px" }}>
                Patient Registration
              </Typography>
            )}
            <Formik
              initialValues={initialValuesRegister}
              validationSchema={RegisterValidationSchema}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
                isValid,
              }) => (
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                  style={{ width: "400px" }}
                >
                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Name"
                      label="Name"
                      type="text"
                      id="Name"
                      autoComplete="Name"
                      value={values.Name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.Name) && Boolean(errors.Name)}
                    />
                    <div className="error-container">
                      {touched.Name && errors.Name && (
                        <div className="helper-text">{errors.Name}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Email"
                      label="Email"
                      type="text"
                      id="Email"
                      autoComplete="Email"
                      value={values.Email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.Email) && Boolean(errors.Email)}
                    />
                    <div className="error-container">
                      {touched.Email && errors.Email && (
                        <div className="helper-text">{errors.Email}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Mobile"
                      label="Mobile"
                      type="text"
                      id="Mobile"
                      autoComplete="Mobile"
                      value={values.Mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.Mobile) && Boolean(errors.Mobile)}
                    />
                    <div className="error-container">
                      {touched.Mobile && errors.Mobile && (
                        <div className="helper-text">{errors.Mobile}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Password"
                      label="Password"
                      type="password"
                      id="Password"
                      autoComplete="Password"
                      value={values.Password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Password) && Boolean(errors.Password)
                      }
                    />
                    <div className="error-container1">
                      {touched.Password && errors.Password && (
                        <div className="helper-text">{errors.Password}</div>
                      )}
                    </div>
                  </div>

                  <div
                    className="field-container"
                    style={{ marginTop: "25px" }}
                  >
                    <TextField
                      margin="normal"
                      fullWidth
                      name="ConfirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="ConfirmPassword"
                      autoComplete="confirm-password"
                      value={values.ConfirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.ConfirmPassword) &&
                        Boolean(errors.ConfirmPassword)
                      }
                    />
                    <div className="error-container">
                      {touched.ConfirmPassword && errors.ConfirmPassword && (
                        <div className="helper-text">
                          {errors.ConfirmPassword}
                        </div>
                      )}
                    </div>
                  </div>

                  <CustomButton>Register</CustomButton>

                  <Grid container justifyContent="center" alignItems="center">
                    <Grid item>
                      {role === "Patient" ? (
                        <Button
                          onClick={changeDoctor}
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "15px",
                            color: "#0d9eb5",
                            marginRight: "8px", // Add some right margin for spacing
                          }}
                        >
                          Are you a doctor? <strong>REGISTER HERE</strong>
                        </Button>
                      ) : (
                        <Button
                          onClick={changePatient}
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "15px",
                            color: "#0d9eb5",
                            marginRight: "8px", // Add some right margin for spacing
                          }}
                        >
                          Are you a patient? <strong>REGISTER HERE</strong>
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                  <Link
                    to="/login"
                    style={{
                      color: "#0d9eb5",
                      textDecoration: "none",
                      fontSize: "14px",
                      display: "block", // Make the link a block element for better spacing
                      marginTop: "16px", // Add top margin for spacing
                      marginLeft: "70px",
                    }}
                  >
                    <strong>Already have an account? Login here</strong>
                  </Link>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default Register;
