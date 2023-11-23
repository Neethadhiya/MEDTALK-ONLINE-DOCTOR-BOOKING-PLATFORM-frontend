import React, { useState, useEffect } from "react";
import patientAxiosInstance from "../../../../Axios/PatientAxios";
import { toast } from "react-toastify";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { baseUrl } from "../../../../utils/constants";
import { Link } from "react-router-dom";
import CustomButton from "../../../Helpers/CustomButton";
import { format, isToday, isTomorrow } from "date-fns";
import Textarea from "@mui/joy/Textarea";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CheckAvailabilty({ doctorId }) {
  const [doctorData, setDoctorData] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [comments, setComments] = useState("");
  const [times, setTimes] = useState([]);
  const [datesWithTimeslots, setDatesWithTimeslots] = useState([]);
  const [selectedDateId, setSelectedDateId] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const filterAndSortDates = (timeSlots) => {
    let sortedTimeSlots;
    if (timeSlots.length > 1) {
      sortedTimeSlots = [...timeSlots].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else {
      sortedTimeSlots = timeSlots;
    }
    return sortedTimeSlots.filter((slot) => {
      const slotDate = new Date(slot.date);
      return isToday(slotDate) || slotDate > new Date();
    });
  };

  function isToday(date) {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
console.log(times,'9999999999999999999999999999999')
  const fetchData = async () => {
    try {
      const response = await patientAxiosInstance.post(
        `book_now_show_timeslot/${doctorId}/`
      );
      if (response.data.error) {
        toast.error(response.data.message);
      } else {
        setDoctorData(response.data.doctor);
        console.log(response.data.doctor);

        const filteredDatesWithTimeslots = filterAndSortDates(
          response.data.time_slots
        );
        setDatesWithTimeslots(filteredDatesWithTimeslots);
      }
    } catch (error) {
      console.error(error);
      // toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchData();
  }, [doctorId, selectedDate]);

  const formatDate = (date) => {
    if (isToday(date)) {
      return "Today";
    } else if (isTomorrow(date)) {
      return "Tomorrow";
    } else {
      return format(date, "EEE, d MMM");
    }
  };

  const handleDateClick = (date, id) => {
    setSelectedDateId(id);
    setSelectedDate(date);
    patientAxiosInstance
      .post("get_timeslots/", { date: date })
      .then((response) => {
        const fetchedTimes = response.data.timeslots[0].times;
        const sortedTimes = sortTimes(fetchedTimes);
        setTimes(sortedTimes);
      })
      .catch((error) => {
        console.error("Error fetching time slots:", error);
      });
  };

  const sortTimes = (times) => {
    return times.sort((a, b) => {
      const timeA = getTimeValue(a.time);
      const timeB = getTimeValue(b.time);
  
      return timeA - timeB;
    });
  };
  
  const getTimeValue = (timeString) => {
    const [time, meridiem] = timeString.split(' ');
    const [hours, minutes] = time.split(':');
  
    let hoursValue = parseInt(hours);
    if (meridiem === 'pm' && hoursValue !== 12) {
      hoursValue += 12;
    } else if (meridiem === 'am' && hoursValue === 12) {
      hoursValue = 0;
    }
  
    return hoursValue * 60 + parseInt(minutes);
  };



  const handleTimeClick = (timeId) => {
    // setIsTimeSelected(true);
    setSelectedTime(timeId);
  };
  const getTimeButtonStyle = (timeId) => {
    if (timeId === selectedTime) {
      return { backgroundColor: "gray", color: "white" };
    } else {
      return { backgroundColor: "#0d9eb5", color: "white" };
    }
  };
  const bookNow = () => {
    const newErrors = {};
    if (!selectedDate) {
      newErrors.date = "Please select a date.";
    }
    if (!selectedTime) {
      newErrors.time = "Please select a time.";
    }
    if (!comments.trim()) {
      newErrors.comments = "Please add comments.";
    }
  
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      handleClickOpen();
    }
  };
  const getButtonStyle = (id) => {
    if (id === selectedDateId) {
      return { backgroundColor: "gray", color: "white" };
    } else {
      return { backgroundColor: "#0d9eb5", color: "white" };
    }
  };

  const confirmBooking = () => {
    handleClose();
    const payload = {
      selectedDate: selectedDate,
      doctorId: doctorId,
      time_id: selectedTime,
      comments: comments,
      timeslot_id: selectedDateId,
      consultation_value: "Video",
    };
    const time_id = selectedTime;
    const now = new Date(); // Get current time
const oneHourAhead = new Date(now.getTime() + 60 * 60 * 1000);
    patientAxiosInstance
      .post("book_appointment/", payload)
      .then((response) => {
        // const appointmentId = response.data.appointment_id
        console.log(
          response.data.appointment_id,
          "response.data.appointment_id............."
        );
        navigate(`/patient/make_payment/${response.data.appointment_id}/`);
        const appointmentId = response.data.appointment_id;
        localStorage.setItem("appointmentId", appointmentId);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        console.error("Error booking appointment:", error);
      });
  };
  return (
    <Container
      maxWidth="lg"
      spacing={3}
      style={{
        marginTop: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Appointment Confirmation"}</DialogTitle>
        <DialogContent>
          {selectedDate ? (
            <div>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to confirm your appointment.
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
          ) : (
            <DialogContentText id="alert-dialog-slide-description">
              No appointment data available.
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={confirmBooking} style={{ width: "200px" }}>
            Confirm
          </CustomButton>
          <CustomButton onClick={handleClose} style={{ width: "200px" }}>
            Cancel
          </CustomButton>
        </DialogActions>
      </Dialog>

      {doctorData ? (
        <Grid container spacing={2} style={{ justifyContent: "center" }}>
          <h2 style={{ color: "#0d9eb5" }}>Select Your Timeslot</h2>

          <img src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1696585540/ibook_pvx4cz.svg" />

          <Grid item xs={12} key={doctorData.id}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                minHeight: "400px",
                border: "solid #0d9eb5",
              }}
            >
              <CardContent>
                <Card
                  style={{
                    height: "270px",
                    backgroundColor: "#0d9eb5",
                    color: "white",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "40px",
                    }}
                  >
                    <img
                      src={`${baseUrl}${doctorData.profileImage}`}
                      alt={doctorData.user.first_name}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                    <div style={{ marginLeft: "30px" }}>
                      <Typography
                        variant="h5"
                        component="div"
                        sx={{ color: "white" }}
                      >
                        Dr. {doctorData.user.first_name}
                      </Typography>

                      <Typography variant="body2" sx={{ color: "white" }}>
                        {doctorData.specialization}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {doctorData.experience} years experience overall
                      </Typography>

                      <Typography variant="body2" sx={{ color: "white" }}>
                        {doctorData.qualification}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {doctorData.location}, {doctorData.city}
                      </Typography>
                      <div style={{ marginTop: "20px" }}>
                        <Typography variant="body2" sx={{ color: "white" }}>
                          ₹ {doctorData.online_fees} Video Consultation fee
                        </Typography>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardContent>

              <CardContent>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {datesWithTimeslots.length > 0 ? (
                    <>
                      <Typography
                        sx={{ color: "#0d9eb5", marginBottom: "-25px" }}
                      >
                        Select your video consultation date
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          borderBottom: "solid #0d9eb5",
                        }}
                      >
                        {datesWithTimeslots.map((slot) => (
                          <Link
                            key={slot.id}
                            style={{
                              textDecoration: "none",
                              margin: "10px",
                              padding: "5px 10px",
                              cursor: "pointer",

                              color: "#60646b",
                            }}
                            onClick={() => handleDateClick(slot.date, slot.id)}
                          >
                            <CustomButton style={getButtonStyle(slot.id)}>
                              {formatDate(new Date(slot.date))}
                            </CustomButton>
                          </Link>
                        ))}
                      </div>
                      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                        <span style={{ color: "red" }}>{errors.date}</span>
                      </div>
                      {selectedDate && (
                        <Typography
                          sx={{ color: "black", marginBottom: "-15px" }}
                        >
                          Select your time
                        </Typography>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          borderBottom: "solid #0d9eb5",
                        }}
                      >
                        {times.length > 0 ? (
                          times.map((time, index) => (
                            <CustomButton
                              key={index}
                              style={{
                                width: "100px",
                                marginRight: "10px",
                                ...getTimeButtonStyle(time.id),
                              }}
                              onClick={() => handleTimeClick(time.id)}
                            >
                              {time.time}
                            </CustomButton>
                          ))
                        ) : selectedDate ? (
                          <p>No slots available for this day</p>
                        ) : null}
                      </div>
                      {selectedDate && (
                        <div
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                        >
                          <span style={{ color: "red" }}>{errors.time}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <p style={{ color: "red" }}>
                      No timeslots available for the doctor
                    </p>
                  )}

                  <div style={{ width: "280px" }}>
                    <Textarea
                      placeholder="Add your comments…"
                      variant="soft"
                      minRows={2}
                      maxRows={6}
                      name="Comments"
                      sx={{
                        "--Textarea-focusedInset": "var(--any, )",
                        "--Textarea-focusedThickness": "0.25rem",
                        "--Textarea-focusedHighlight": "rgba(13,110,253,.25)",
                        "&::before": {
                          transition: "box-shadow .15s ease-in-out",
                        },
                        "&:focus-within": {
                          borderColor: "#86b7fe",
                        },
                      }}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                    />

                    <div style={{ marginTop: "10px", marginBottom: "10px" }}>
                      <span style={{ color: "red" }}>{errors.comments}</span>
                    </div>

                    <CustomButton onClick={() => bookNow()}>
                      Book Now
                    </CustomButton>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <img
          src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1697298615/2696450_ssf2rm.jpg"
          style={{ width: "100%", height: "85vh" }}
        />
      )}
    </Container>
  );
}

export default CheckAvailabilty;
