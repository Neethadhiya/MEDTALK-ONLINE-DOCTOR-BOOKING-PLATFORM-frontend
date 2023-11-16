import React, { useState } from "react";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Formik } from "formik";
import TimeSlotVideoConsult from "../../../Validation/TimeSlotVideoConsult";
import "./VideoConsultTimeSlot.css";
import InputLabel from "@mui/material/InputLabel";
import CustomButton from "../../../Helpers/CustomButton";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import { useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { format } from "date-fns";

const initialValuesRegister = {
  Date: "",
  Time: [],
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 120,
    },
  },
};

const time = [
  "8.00 am",
  "8.30 am",
  "9.00 am",
  "9.30 am",
  "10.00 am",
  "10.30 am",
  "11.00 am",
  "11.30 am",
  "12.00 pm",
  "12.30 pm",
  "1.00 pm",
  "1.30 pm",
  "2.00 pm",
  "2.30 pm",
  "3.00 pm",
  "3.30 pm",
  "4.00 pm",
  "4.30 pm",
  "5.00 pm",
  "5.30 pm",
  "6.00 pm",
  "6.30 pm",
  "7.00 pm",
  "7.30 pm",
  "8.00 pm",
  "8.30 pm",
  "9.00 pm",
  "9.30 pm",
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function VideoConsultTimeSlot() {
  const defaultTheme = createTheme();
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Define selectedDate and initialize it to null
  const [selectedDateText, setSelectedDateText] = useState("");
  const [selectedTimeSlotsText, setSelectedTimeSlotsText] = useState("");
  const [selectedTimeSlots, setSelectedTimeSlots] = useState([]);

  console.log(selectedDate,'date')
  console.log(selectedTimeSlots,'gggg')
  const updateSelectedText = () => {
    setSelectedDateText(
      selectedDate ? `Selected Date: ${selectedDate.toDateString()}` : ""
    );
    setSelectedTimeSlotsText(
      selectedTimeSlots.length
        ? `Selected Time Slots: ${selectedTimeSlots.join(", ")}`
        : ""
    );
  };

  const handleChange = (event) => {
    console.log("iiiiiiiiiiiiiii");
    const {
      target: { name, value },
    } = event;

    if (name === "Time") {
      if (selectedTimeSlots.includes(value)) {
        const updatedTimeSlots = selectedTimeSlots.filter(
          (slot) => slot !== value
        );
        setSelectedTimeSlots(updatedTimeSlots);
      } else {
        // If the time slot is not selected, add it
        setSelectedTimeSlots([...selectedTimeSlots, value]);
      }
    }

    // Update the selected text when the user makes a selection
    updateSelectedText();
  };

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      const inputDate = new Date(values.Date);
      inputDate.setDate(inputDate.getDate() + 1);
const formattedDate = inputDate.toUTCString(); // Use toUTCString()

// Manipulate the date to match the Django format if necessary
// For example:
const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][inputDate.getUTCDay()];
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][inputDate.getUTCMonth()];

const formattedDjangoDate = `${dayOfWeek} ${month} ${inputDate.getUTCDate()} ${inputDate.getUTCFullYear()} ${inputDate.getUTCHours()}:${inputDate.getUTCMinutes()}:${inputDate.getUTCSeconds()} GMT+0000 (UTC)`;
      formData.append("date", formattedDjangoDate);
      console.log(values.Date,'hhhhhhhhhhh')
      formData.append("time", values.Time);
      const response = await doctorAxiosInstance.post(
        `timeslot_video_consult/`,
        formData
      );
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    resetForm();
  };

  const handleDeleteTimeSlot = (timeSlot) => {
    const updatedTimeSlots = selectedTimeSlots.filter(
      (slot) => slot !== timeSlot
    );
    setSelectedTimeSlots(updatedTimeSlots);
  };

  return (
    <div className="app" style={{ marginTop: "60px" }}>
      <DoctorSidebar />
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "#0d9eb5" }}> Add Time Slots</h2>

            <Formik
              initialValues={initialValuesRegister}
              validationSchema={TimeSlotVideoConsult}
              onSubmit={handleSubmit}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
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
                >
                  <div className="field-container">
                    <label style={{ fontSize: "16px" }}>Select Date</label>
                    <br></br>
                    <DatePicker
                      selected={values.Date} // Use uppercase 'Date'
                      onChange={(date) => {
                        setFieldValue("Date", date); // Use uppercase 'Date'
                        updateSelectedText(date, values.Time);
                      }}
                      minDate={new Date()}
                      maxDate={
                        new Date(
                          new Date().getTime() + 10 * 24 * 60 * 60 * 1000
                        )
                      }
                    />

                    {touched.Date && errors.Date && (
                      <div className="error-container">
                        <div className="helper-text">{errors.Date}</div>
                      </div>
                    )}
                  </div>

                  <Typography>Select Time</Typography>
                  <div className="field-container">
                    <FormControl>
                      <InputLabel htmlFor="Time"></InputLabel>
                      <Select
                        multiple
                        displayEmpty
                        value={values.Time}
                        onBlur={handleBlur}
                        onChange={(e) => {
                          setFieldValue("Time", e.target.value); // Update Formik value
                          if (values.Time.includes(e.target.value)) {
                            // If the time slot is already selected, remove it
                            const updatedTimeSlots = values.Time.filter(
                              (slot) => slot !== e.target.value
                            );
                            setSelectedTimeSlots(updatedTimeSlots);
                          } else {
                            // If the time slot is not selected, add it
                            setSelectedTimeSlots([
                              ...values.Time,
                              e.target.value,
                            ]);
                          }
                          updateSelectedText(values.Date, e.target.value); // Manually update selected text
                        }}
                        input={<OutlinedInput style={{ width: "400px" }} />}
                        renderValue={(selected) => {
                          if (selected.length === 0) {
                            return <em>Select Time</em>;
                          }
                          return selected.join(", ");
                        }}
                        MenuProps={MenuProps}
                        inputProps={{ "aria-label": "Without label" }}
                        labelId="Time"
                        id="Time"
                        name="Time"
                      >
                        {time.map((name) => (
                          <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, values.Time, theme)}
                          >
                            {name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <div className="error-container">
                      {touched.Time && errors.Time && (
                        <div className="helper-text">{errors.Time}</div>
                      )}
                    </div>
                  </div>

                  <CustomButton>Add Timeslot</CustomButton>
                </Box>
              )}
            </Formik>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default VideoConsultTimeSlot;
