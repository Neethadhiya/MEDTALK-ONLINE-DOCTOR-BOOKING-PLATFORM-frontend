import React, { useEffect, useState } from "react";
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
import DoctorProfileEditValidation from "../../Validation/DoctorProfileEditValidation";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./EditProfile.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import doctorAxiosInstance from "../../../Axios/DoctorAxios";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Loader from "../../Loader/Loader";
import Slide from "@mui/material/Slide";
import DoctorSidebar from "../../Role/Doctor/DoctorSidebar/DoctorSidebar";
import { baseUrl } from "../../../utils/constants";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function DoctorProfileEdit() {
  const defaultTheme = createTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formValues, setFormValues] = useState({
    id: "",
    user_first_name: "",
    user_email: "",
    user_mobile: "",
    qualification: "",
    specialization: "",
    experience: "",
    online_fees: "",
    chat_fees: "",
  });

  const fetchData = () => {
    doctorAxiosInstance
      .get(`view_doctor_profile_dashboard/`)
      .then((response) => {
        console.log(response.data.doctor, "hhhhhhhh");
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          user_first_name: response.data.doctor.user_first_name,
          user_email: response.data.doctor.user_email,
          user_mobile: response.data.doctor.user_mobile,
          id: response.data.doctor.id,
          qualification: response.data.doctor.qualification,
          specialization: response.data.doctor.specialization,
          experience: response.data.doctor.experience,
          online_fees: response.data.doctor.online_fees,
          chat_fees: response.data.doctor.chat_fees,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("qualification", formValues.qualification);
      formData.append("specialization", formValues.specialization);
      formData.append("experience", formValues.experience);
      formData.append("online_fees", formValues.online_fees);
      formData.append("chat_fees", formValues.chat_fees);

      const response = await doctorAxiosInstance.put(
        `edit_doctor_profile/`,
        formData
      );
      if (response.data) {
        toast.success(response.data.message);
        navigate("/doctor");
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
    <div className="app" style={{ marginTop: "60px", marginBottom: "20px" }}>
      <DoctorSidebar />
      <ThemeProvider theme={defaultTheme}>
        {isLoading ? (
          <Loader />
        ) : (
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
              <h2 style={{ color: "#0d9eb5" }}> Update Your Profile</h2>

              <form style={{ width: "400px" }} onSubmit={handleSubmit}>
                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="user_first_name"
                    disabled
                    label="Name"
                    type="text"
                    inputProps={{
                      min: 3,
                      max: 20,
                    }}
                    id="user_first_name"
                    autoComplete="user_first_name"
                    value={formValues.user_first_name}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        user_first_name: e.target.value,
                      })
                    }
                  />
                  {/* <div className="error-container">
                      {touched.experience && errors.experience && (
                        <div className="helper-text">{errors.experience}</div>
                      )}
                    </div> */}
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="user_email"
                    disabled
                    label="Email"
                    type="text"
                    inputProps={{
                      min: 3,
                      max: 20,
                    }}
                    id="user_email"
                    autoComplete="user_email"
                    value={formValues.user_email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        user_email: e.target.value,
                      })
                    }
                  />
                  {/* <div className="error-container">
                      {touched.experience && errors.experience && (
                        <div className="helper-text">{errors.experience}</div>
                      )}
                    </div> */}
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="user_mobile"
                    label="Mobile"
                    disabled
                    type="text"
                    inputProps={{
                      min: 3,
                      max: 20,
                    }}
                    id="user_mobile"
                    autoComplete="user_mobile"
                    value={formValues.user_mobile}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        user_mobile: e.target.value,
                      })
                    }
                  />
                  {/* <div className="error-container">
                      {touched.experience && errors.experience && (
                        <div className="helper-text">{errors.experience}</div>
                      )}
                    </div> */}
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="qualification"
                    label="Qualification"
                    type="text"
                    id="qualification"
                    autoComplete="qualification"
                    value={formValues.qualification}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        qualification: e.target.value,
                      })
                    }
                  />
                  {/* <div className="error-container">
    {touched.qualification && errors.qualification && (
      <div className="helper-text">
        {errors.qualification}
      </div>
    )}
  </div> */}
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="experience"
                    label="Experience"
                    type="number"
                    inputProps={{
                      min: 3,
                      max: 20,
                    }}
                    id="experience"
                    autoComplete="experience"
                    value={formValues.experience}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        experience: e.target.value,
                      })
                    }
                  />
                  {/* <div className="error-container">
                      {touched.experience && errors.experience && (
                        <div className="helper-text">{errors.experience}</div>
                      )}
                    </div> */}
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="specialization"
                    label="Specialization"
                    type="text"
                    id="specialization"
                    autoComplete="specialization"
                    value={formValues.specialization}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        specialization: e.target.value,
                      })
                    }
                  />
               
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="online_fees"
                    label="Video Consultation Fees"
                    type="number"
                    inputProps={{
                      min: 300,
                      max: 2000,
                    }}
                    id="online_fees"
                    autoComplete="online_fees"
                    value={formValues.online_fees}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        online_fees: e.target.value,
                      })
                    }
                  />
               
                </div>

                <div className="field-container">
                  <TextField
                    margin="normal"
                    fullWidth
                    name="chat_fees"
                    label="Chat Consultation Fee"
                    type="number"
                    inputProps={{
                      min: 300,
                      max: 2000,
                    }}
                    id="chat_fees"
                    autoComplete="chat_fees"
                    value={formValues.chat_fees}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        chat_fees: e.target.value,
                      })
                    }
                  />
                </div>

                <CustomButton>Update</CustomButton>
              </form>
            </Box>
          </Container>
        )}
      </ThemeProvider>
    </div>
  );
}

export default DoctorProfileEdit;
