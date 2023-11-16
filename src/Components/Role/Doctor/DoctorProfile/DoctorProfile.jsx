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
import CustomButton from "../../../Helpers/CustomButton";
import { Formik } from "formik";
import DoctorProfileValidation from "../../../Validation/DoctorProfileValidation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./DoctorProfile.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Loader from "../../../Loader/Loader";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const initialValuesRegister = {
  Qualification: "",
  Experience: "",
  Specialization: "",
  Gender: "",
  Location: "",
  City: "",
  OnlineFees: "",
  // ChatFees: "",
  ProfileImage: null,
  Documents: null,
};
function DoctorProfile() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    navigate("/doctor");
  };

  function handleInputChange(e, setFieldValue) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
      setShow(true);
      setFieldValue("ProfileImage", file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleRemoveImage = () => {
    if (image) {
      URL.revokeObjectURL(image);
    }
    URL.revokeObjectURL(image);
    setFile(null);
    setImage("");
    setShow(false);
  };

  const [selectedImages, setSelectedImages] = useState([]);
  function handleImageUpload(e, setFieldValue) {
    const selectedFiles = Array.from(e.target.files);
    setFieldValue("Documents", selectedFiles);
    const imagePreviews = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setSelectedImages(imagePreviews);
  }

  function deleteFile(e) {
    URL.revokeObjectURL(selectedImages[e]);
    const s = selectedImages.filter((item, index) => index !== e);
    setSelectedImages(s);
    console.log(s);
  }

  const handleSubmit = async (values, { resetForm }) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const ChatFees = 400;
      formData.append("qualification", values.Qualification);
      formData.append("gender", values.Gender);
      formData.append("specialization", values.Specialization);
      formData.append("experience", values.Experience);
      formData.append("location", values.Location);
      formData.append("city", values.City);
      formData.append("online_fees", values.OnlineFees);
      formData.append("chat_fees", ChatFees);
      formData.append("profileImage", values.ProfileImage);
      const quali = formData.get("Qualification");
      const profileImage = formData.get("ProfileImage");
      values.Documents.forEach((document, index) => {
        formData.append("documents", document);
      });
      resetForm();
      setSelectedImages([]);
      setShow(false);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await doctorAxiosInstance.post(
        `create_doctor_profile/`,
        formData,
        config
      );
      if (response.data) {
        // toast.success(response.data.message);
        handleOpen();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Doctor Profile created"}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your Profile created Successfully. Once admin verifies you, you will
            get an email, and then you can start consultation.
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
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={handleClose}>Ok</CustomButton>
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
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "#0d9eb5" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography>Create Your Profile</Typography>
            <Formik
              initialValues={initialValuesRegister}
              validationSchema={DoctorProfileValidation}
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
                      name="Qualification"
                      label="Qualification"
                      type="text"
                      id="Qualification"
                      autoComplete="Qualification"
                      value={values.Qualification}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Qualification) &&
                        Boolean(errors.Qualification)
                      }
                    />
                    <div className="error-container">
                      {touched.Qualification && errors.Qualification && (
                        <div className="helper-text">
                          {errors.Qualification}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <Grid item xs={12}>
                      <FormLabel component="legend">Gender</FormLabel>

                      <RadioGroup
                        aria-label="Gender"
                        name="Gender"
                        value={values.Gender}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <FormControlLabel
                          value="Male"
                          type="radio"
                          name="Gender"
                          control={<Radio />}
                          onChange={handleChange}
                          defaultChecked={values.Gender === "male"}
                          label={<span style={{ color: "#60646b" }}>Male</span>}
                        />
                        <FormControlLabel
                          value="Female"
                          type="radio"
                          control={<Radio />}
                          onChange={handleChange}
                          defaultChecked={values.Gender === "female"}
                          label={
                            <span style={{ color: "#60646b" }}>Female</span>
                          }
                        />
                        <FormControlLabel
                          value="Other"
                          control={<Radio />}
                          label={
                            <span style={{ color: "#60646b" }}>Other</span>
                          }
                        />
                      </RadioGroup>
                    </Grid>

                    {touched.Gender && errors.Gender && (
                      <div className="error-container">
                        <div className="helper-text">{errors.Gender}</div>
                      </div>
                    )}
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Experience"
                      label="Experience"
                      type="number"
                      inputProps={{
                        min: 3,
                        max: 20,
                      }}
                      id="Experience"
                      autoComplete="Experience"
                      value={values.Experience}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Experience) &&
                        Boolean(errors.Experience)
                      }
                    />
                    <div className="error-container">
                      {touched.Experience && errors.Experience && (
                        <div className="helper-text">{errors.Experience}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Specialization"
                      label="Specialization"
                      type="text"
                      id="Specialization"
                      autoComplete="Specialization"
                      value={values.Specialization}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Specialization) &&
                        Boolean(errors.Specialization)
                      }
                    />
                    <div className="error-container">
                      {touched.Specialization && errors.Specialization && (
                        <div className="helper-text">
                          {errors.Specialization}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Location"
                      label="Location"
                      type="text"
                      id="Location"
                      autoComplete="Location"
                      value={values.Location}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Location) && Boolean(errors.Location)
                      }
                    />
                    <div className="error-container">
                      {touched.Location && errors.Location && (
                        <div className="helper-text">{errors.Location}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="City"
                      label="City"
                      type="text"
                      id="City"
                      autoComplete="City"
                      value={values.City}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={Boolean(touched.City) && Boolean(errors.City)}
                    />
                    <div className="error-container">
                      {touched.City && errors.City && (
                        <div className="helper-text">{errors.City}</div>
                      )}
                    </div>
                  </div>

                  <div className="field-container">
                    <TextField
                      margin="normal"
                      fullWidth
                      name="OnlineFees"
                      label="Video Consultation Fees"
                      type="number"
                      inputProps={{
                        min: 300,
                        max: 2000,
                      }}
                      id="OnlineFees"
                      autoComplete="OnlineFees"
                      value={values.OnlineFees}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.OnlineFees) &&
                        Boolean(errors.OnlineFees)
                      }
                    />
                    <div className="error-container">
                      {touched.OnlineFees && errors.OnlineFees && (
                        <div className="helper-text">{errors.OnlineFees}</div>
                      )}
                    </div>
                  </div>

                  <Grid item xs={12}>
                    <FormLabel component="legend">Profile Picture</FormLabel>
                    <label htmlFor="file-upload-label">
                      <Button
                        component="span"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        type="button"
                        sx={{
                          mt: 3,
                          mb: 2,
                          backgroundColor: "#0996b3",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#0996b3",
                          },
                        }}
                      >
                        Upload Image
                      </Button>
                    </label>
                    <input
                      type="file"
                      name="ProfileImage"
                      accept="image/*"
                      id="file-upload-label"
                      onChange={(e) => handleInputChange(e, setFieldValue)}
                      style={{ display: "none" }}
                    />
                    {show && (
                      <div
                        className="image-container"
                        style={{ width: "70px", height: "70px" }}
                      >
                        {image && (
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginLeft: "10px",
                              marginTop: "20px",
                              flexDirection: "row",
                            }}
                          >
                            <img
                              src={image}
                              alt="Uploaded"
                              style={{
                                width: "100%",
                                height: "100%",
                                marginRight: "4px",
                              }}
                            />
                            <Button type="button" onClick={handleRemoveImage}>
                              <HighlightOffIcon />
                            </Button>
                          </div>
                        )}
                      </div>
                    )}

                    {touched.ProfileImage && errors.ProfileImage && (
                      <div
                        style={{
                          color: "#ed1607",
                          fontSize: "12px",
                          marginLeft: "15px",
                        }}
                      >
                        {errors.ProfileImage}
                      </div>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <FormLabel component="legend">Certificates</FormLabel>
                    <label htmlFor="file-upload-label11">
                      <Button
                        component="span"
                        variant="contained"
                        type="button"
                        startIcon={<CloudUploadIcon />}
                        sx={{
                          mt: 2,
                          mb: 2,
                          backgroundColor: "#0996b3",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "white",
                            color: "#0996b3",
                          },
                        }}
                        className="btnStyle"
                      >
                        Upload Documents
                      </Button>
                    </label>
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        name="Documents"
                        disabled={selectedImages.length === 5}
                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                        id="file-upload-label11"
                        style={{ display: "none" }}
                      />
                    </div>
                    <div className="form-group preview">
                      {selectedImages.length > 0 &&
                        selectedImages.map((item, index) => {
                          return (
                            <div
                              key={item}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginLeft: "10px",
                                marginTop: "20px",
                                flexDirection: "row",
                              }}
                            >
                              <img
                                src={item}
                                alt=""
                                style={{
                                  width: "50px",
                                  height: "50px",
                                  marginRight: "4px",
                                }}
                              />
                              <Button
                                type="button"
                                onClick={() => deleteFile(index)}
                              >
                                <HighlightOffIcon />
                              </Button>
                            </div>
                          );
                        })}
                    </div>
                    {touched.Documents && errors.Documents && (
                      <div
                        style={{
                          color: "#ed1607",
                          fontSize: "12px",
                          marginLeft: "15px",
                        }}
                      >
                        {errors.Documents}
                      </div>
                    )}
                  </Grid>

                  <CustomButton>Create</CustomButton>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      )}
    </ThemeProvider>
  );
}

export default DoctorProfile;
