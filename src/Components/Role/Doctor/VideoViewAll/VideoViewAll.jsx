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
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import CustomButton from "../../../Helpers/CustomButton";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";

const VideoViewAll = () => {
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
  const fetchData = () => {
    doctorAxiosInstance
      .get("video_view_all/")
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
        <h2 style={{ color: "#0d9eb5" }}> All Video Consult</h2>
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
                <TableCell style={{ color: "white" }}>Email</TableCell>
                <TableCell style={{ color: "white" }}>Mobile</TableCell>
                <TableCell style={{ color: "white" }}>Date</TableCell>
                <TableCell style={{ color: "white" }}>Time</TableCell>
                <TableCell style={{ color: "white" }}>Status</TableCell>
                <TableCell style={{ color: "white" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>{rowIndex++}</TableCell> {/* Display the index */}
                  <TableCell>{appointment.user}</TableCell>
                  <TableCell>{appointment.consultation_type}</TableCell>
                  <TableCell>{appointment.email}</TableCell>
                  <TableCell>{appointment.mobile}</TableCell>
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

export default VideoViewAll;
