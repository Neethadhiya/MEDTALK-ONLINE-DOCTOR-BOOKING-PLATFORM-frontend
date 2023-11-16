import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import doctorAxiosInstance from "../../../Axios/DoctorAxios"
import CustomButton from "../../Helpers/CustomButton"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DoctorSidebar from "./DoctorSidebar/DoctorSidebar"
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TodaysVideoConsult = () => {
  const defaultTheme = createTheme();
  const [appointments, setAppointments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentPerPage = 15;
  let rowIndex = 1;

  const [isLoading, setIsloading] = useState(true);
  const userInfo = useSelector((state) => state.AdminInfo);
  const [events, setEvents] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [eventToApprove, setEventToApprove] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [appoinmentId, setAppointmentId] = useState("");


  const handleClickOpen = (id) => {
    setAppointmentId(id);

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = () => {
    doctorAxiosInstance
      .get("todays_video_consult/")
      .then((response) => {
        setAppointments(response.data.appointments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  function normalizeTime(time) {
    const normalizedTime = time.toLowerCase();

    return normalizedTime.replace(/(am|pm)/, " $1");
  }
  const normalizedQuery = normalizeTime(searchQuery);
  const filteredAppointments = appointments.filter((appointment) => {
    const normalizedQuery = searchQuery.toLowerCase();
    const normalizedTime = normalizeTime(appointment.time);
    return (
      Object.values(appointment).some(
        (attribute) =>
          attribute &&
          typeof attribute === "string" &&
          attribute.toLowerCase().includes(normalizedQuery)
      ) ||
      new Date(appointment.selected_date)
        .toLocaleDateString("en-GB")
        .includes(normalizedQuery) ||
      appointment.email.includes(normalizedQuery) ||
      normalizedTime.includes(normalizedQuery) ||
      appointment.status.includes(normalizedQuery)
    );
  });

  const onSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleCancetAppointment = () => {
    handleClose();
    const id = appoinmentId;
    doctorAxiosInstance
      .patch(`cancel_appointment/${id}/`)
      .then((response) => {
        if (response.status === 200) {
          toast.success(response.data.message);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while making the request.");
        }
        navigate("/doctor/view_appoinments/");
      });
  };

  const indexOfLastEvent = currentPage * appointmentPerPage;
  const indexOfFirstAppointment = indexOfLastEvent - appointmentPerPage;
  const currentEvents = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastEvent
  );

  return (
    <div className="app" style={{ minHeight: "120vh" }}>
      <DoctorSidebar />
      <Container maxWidth="xl" style={{ marginTop: "0px" }}>
      <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{" Cancel Appointment"}</DialogTitle>
            <DialogContent>
              <div>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to cancel the appointment?
                </DialogContentText>
              </div>
            </DialogContent>
            <DialogActions>
              <CustomButton
                onClick={handleCancetAppointment}
                style={{ width: "200px" }}
              >
                Confirm
              </CustomButton>
              <CustomButton onClick={handleClose} style={{ width: "200px" }}>
                Cancel
              </CustomButton>
            </DialogActions>
          </Dialog>
          <h2 style={{color:'#0d9eb5'}}>Today's Video Consult</h2>
        <div style={{ marginBottom: "30px" }}>
          <TextField
            label="Search Appointments"
            variant="outlined"
            size="small"
            style={{ marginLeft: "16px", flexGrow: 0.3, width: "400px" }}
            onChange={onSearchChange}
          />
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#0d9eb5" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>#</TableCell>{" "}
                {/* Add this cell for the index */}
                <TableCell style={{ color: "white" }}>Name</TableCell>
                <TableCell style={{ color: "white" }}>Consultation</TableCell>
                <TableCell style={{ color: "white" }}>Date</TableCell>
                <TableCell style={{ color: "white" }}>Time</TableCell>
                <TableCell style={{ color: "white" }}>Appointment Status</TableCell>
                <TableCell style={{ color: "white" }}>Cancel Appointment</TableCell>
                <TableCell style={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{rowIndex++}</TableCell> {/* Display the index */}
                  <TableCell>{appointment.user}</TableCell>
                  <TableCell>{appointment.consultation_type}</TableCell>
                  <TableCell>
                    {new Date(appointment.selected_date).toLocaleDateString(
                      "en-GB"
                    )}
                  </TableCell>
                  <TableCell>{appointment.time}</TableCell>
                  {appointment.status == "Canceled" ? (
                    <TableCell style={{ color: "red" }}>
                      {appointment.status}
                    </TableCell>
                  ) : (
                    <TableCell style={{ color: "green" }}>
                      {appointment.status}
                    </TableCell>
                  )}
                 
                 
                  <TableCell>
                  {appointment.status == "Canceled" ? (
                    <CustomButton  disabled style={{width:'200px',color:'red'}}>
                      Canceled 
                    </CustomButton>
                  ) : (
                    <CustomButton
                    onClick={() => handleClickOpen(appointment.id)}
                      style={{ width: "200px" }}
                    >
                      Cancel
                    </CustomButton>
                  )}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/doctor/view_appointment_details/${appointment.id}`}
                    >
                      <CustomButton>View</CustomButton>
                    </Link>
                  </TableCell>
      
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Pagination
              count={Math.ceil(
                filteredAppointments.length / appointmentPerPage
              )}
              page={currentPage}
              onChange={(event, value) => setCurrentPage(value)}
            />
          </div>
        </TableContainer>
      </Container>
    </div>
  );
};

export default TodaysVideoConsult;
