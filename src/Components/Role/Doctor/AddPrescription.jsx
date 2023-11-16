import React, { useState, useEffect } from "react";
import DoctorSidebar from "./DoctorSidebar/DoctorSidebar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CustomButton from "../../Helpers/CustomButton";
import doctorAxiosInstance from "../../../Axios/DoctorAxios";
import PrescriptionValidation from "../../Validation/PrescriptionValidation";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: "50%",
  color: theme.palette.text.primary,
}));
const message = `Truncation should be conditionally applicable on this long line of text
 as this is a much longer line than what the container can support. `;

const initialValuesRegister = {
  Medicines: [],
  Instructions: "",
  Comments: "",
};
function getCurrentDate() {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, "0"); // Get day with leading zero if needed
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
  const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of the year
  return `${day}-${month}-${year}`;
}

function AddPrescription({ id }) {
  const [patient, setPatientData] = useState("");
  const currentDateFormatted = getCurrentDate();
  const [appoinmentId, setAppoinmentId] = useState("");
  const [medicines, setMedicines] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [emptyMedicineError, setEmptyMedicineError] = useState(null);
  

  const handleAddField = () => {
    const lastMedicine = medicines[medicines.length - 1];
    if (lastMedicine.trim() === "") {
      setEmptyMedicineError("Medicine cannot be empty");
    } else {
      setEmptyMedicineError(null);
      setMedicines([...medicines, ""]);
    }
  };

    const handleRemoveField = (index) => {
    // Remove the field at the specified index
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const navigate = useNavigate();
  const fetchData = () => {
    doctorAxiosInstance
      .get(`get_patient_info/${id}/`)
      .then((response) => {
        setPatientData(response.data.patient_data);
        setAppoinmentId(response.data.patient_data.id);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log(isToday,'hhhhhhhhhhh')
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  

  const handleSubmit = async (values, { resetForm }) => {
    if (!formSubmitted) {
      setFormSubmitted(true);
      

      const payload = {
        medicines: values.Medicines,
        instructions: values.Instructions,
        comments: values.Comments,
      };
      resetForm();
      try {
        
        const response = await doctorAxiosInstance.post(
          `add_prescription/${appoinmentId}/`,
          payload
        );
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/doctor");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
      setFormSubmitted(false);
    }
  };

  return (
    <div className="app" style={{ minHeight: "120vh" }}>
      <DoctorSidebar />
      <Formik
        initialValues={initialValuesRegister}
        validationSchema={PrescriptionValidation}
        onSubmit={handleSubmit}
        initialTouched={{}}
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
            sx={{ flexGrow: 1, px: 3 }}
            component="form"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* ------------------------------------------------------------------------------------- */}

            <StyledPaper
              sx={{
                my: 1,
                mx: "auto",
                p: 2,
                marginTop: "10px",
              }}
            >
              <Grid container spacing={2} style={{ justifyContent: "center" }}>
                <h2 style={{ color: "#0d9eb5" }}>Add Prescription</h2>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>Name</Typography>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>{patient.name}</Typography>
                </Grid>
              </Grid>

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>Email</Typography>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>{patient.email}</Typography>
                </Grid>
              </Grid>
              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>Date</Typography>
                </Grid>
                <Grid item xs={6} md={6} lg={6}>
                  <Typography noWrap>{currentDateFormatted}</Typography>
                </Grid>
              </Grid>
            </StyledPaper>
            {/* ------------------------------------------------------------------------------------- */}
            <StyledPaper
              sx={{
                my: 1,
                mx: "auto",
                p: 2,
              }}
            >
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs>
                  <Typography noWrap sx={{ marginBottom: "15px" }}>
                    Add medicine
                  </Typography>
                </Grid>
              </Grid>

              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs={12} md={12} lg={12}>
                  {medicines.map((medicine, index) => (
                    <Box key={index} mb={2}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <TextField
                          fullWidth
                          label={`Medicine ${index + 1}`}
                          variant="outlined"
                          value={medicine}
                          name={`Medicines[${index}]`}
                          autoFocus
                          onChange={(e) => {
                            const updatedMedicines = [...medicines];
                            updatedMedicines[index] = e.target.value;
                            setMedicines(updatedMedicines);
                            setFieldValue(
                              `Medicines[${index}]`,
                              e.target.value
                            );
                          }}
                          onBlur={handleBlur}
                          error={
                            touched.Medicines &&
                            touched.Medicines[index] &&
                            errors.Medicines &&
                            errors.Medicines[index]
                          }
                        />
                        <Button onClick={() => handleRemoveField(index)}>
                          <HighlightOffIcon />
                        </Button>
                      </div>
                      {touched.Medicines && errors.Medicines && (
                        <div
                          className="helper-text"
                          style={{
                            color: "red",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                        >
                          {errors.Medicines}
                        </div>
                      )}
                      {index === medicines.length - 1 && emptyMedicineError && (
                        <div className="helper-text" style={{ color: "red" }}>
                          {emptyMedicineError}
                        </div>
                      )}
                    </Box>
                  ))}

                  <CustomButton
                    onClick={handleAddField}
                    style={{ width: "180px" }}
                  >
                    Add Medicine
                  </CustomButton>
                </Grid>
              </Grid>
            </StyledPaper>

            {/* ------------------------------------------------------------------------------------- */}

            <StyledPaper
              sx={{
                my: 1,
                mx: "auto",
                p: 2,
              }}
            >
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs>
                  <Typography noWrap sx={{ marginBottom: "8px" }}>
                    Add Instructions
                  </Typography>
                </Grid>
              </Grid>
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs={12} md={12} lg={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Instructions"
                      label="Instructions"
                      multiline // Add this prop to make it a text area
                      rows={6}
                      type="text"
                      id="Instructions"
                      autoComplete="Instructions"
                      Comments
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Instructions) &&
                        Boolean(errors.Instructions)
                      }
                    />
                  </div>
                  {touched.Instructions && errors.Instructions && (
                    <div className="helper-text" style={{ color: "red" }}>
                      {errors.Instructions}
                    </div>
                  )}
                 
                </Grid>
              </Grid>
              {/* ------------------------------------------------------------------------------------- */}

              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs>
                  <Typography noWrap>Add Comments</Typography>
                </Grid>
              </Grid>
              <Grid
                container
                wrap="nowrap"
                spacing={2}
                style={{ justifyContent: "center" }}
              >
                <Grid item xs={12} md={12} lg={12}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <TextField
                      margin="normal"
                      fullWidth
                      name="Comments"
                      label="Comments"
                      multiline // Add this prop to make it a text area
                      rows={6}
                      type="text"
                      id="Comments"
                      autoComplete="Comments"
                      Comments
                      autoFocus
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        Boolean(touched.Comments) && Boolean(errors.Comments)
                      }
                    />
                  </div>
                  {touched.Instructions && errors.Instructions && (
                    <div className="helper-text" style={{ color: "red" }}>
                      {errors.Instructions}
                    </div>
                  )}
                 
                </Grid>
              </Grid>
              {/* ------------------------------------------------------------------------------------- */}

              <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <CustomButton>Add Prescription</CustomButton>
                </Grid>
              </Grid>
            </StyledPaper>
          </Box>
        )}
      </Formik>
    </div>
  );
}

export default AddPrescription;
