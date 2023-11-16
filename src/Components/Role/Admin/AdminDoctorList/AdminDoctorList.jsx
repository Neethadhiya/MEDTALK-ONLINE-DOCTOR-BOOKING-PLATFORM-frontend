import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import adminAxiosInstance from "../../../../Axios/AdminAxios";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../../Helpers/CustomButton";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#0d9eb5",
    color: theme.palette.common.white,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  width: "20%",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "theme.palette.action.hover",
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function AdminDoctorList() {
  const defaultTheme = createTheme();
  const [doctorList, setDoctorsList] = useState([]);
  const { adminInfo } = useSelector((state) => state.auth);
  const [block, setBlock] = useState();

  const fetchData = () => {
    adminAxiosInstance
      .get("show_doctor_list/")
      .then((response) => {
        setDoctorsList(response.data.doctors);
        console.log("response.data.doctors", response.data.doctors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [doctorList]);

  const handleBlockDoctor = (doctorId) => {
    confirmBlock(doctorId);
    setDoctorsList((prevUsers) =>
      prevUsers.map((doctor) =>
        doctor.user.id === doctorId
          ? {
              ...doctor,
              user: { ...doctor.user, is_active: !doctor.user.is_active },
            }
          : doctor
      )
    );
  };

  const confirmBlock = async (doctorId) => {
    try {
      const response = await adminAxiosInstance.patch(
        `block_doctor/${doctorId}/`
      );
      if (response.data) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="1000px">
        {console.log("Component re-rendered")}
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // marginLeft:0,
          }}
        >
          <Box
            sx={{
              width: "100%", // Set a responsive width
              overflowX: "auto", // Enable horizontal scrolling on small screens
            }}
          >
            <TableContainer component={Paper} sx={{ marginTop: "50px" }}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Id</StyledTableCell>
                    <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Email</StyledTableCell>
                    <StyledTableCell align="center">Mobile</StyledTableCell>
                    <StyledTableCell align="center">
                      Approval Status
                    </StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                    <StyledTableCell align="center">
                      BLOCK Doctor
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {doctorList.map((doctor) => (
                    <StyledTableRow key={doctor.user.id}>
                      <StyledTableCell align="center">
                        {doctor.user.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        Dr. {doctor.user.first_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {doctor.user.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {doctor.user.mobile}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{
                          color:
                            doctor.status === "Approved"
                              ? "green"
                              : doctor.status === "New Request"
                              ? "blue"
                              : "red",
                        }}
                      >
                        <strong>{doctor.status}</strong>
                      </StyledTableCell>

                      <StyledTableCell align="right">
                        <Link
                          to={`/admin/view_doctor_details/${doctor.user.id}`}
                        >
                          <CustomButton>View</CustomButton>
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {doctor.user.is_active ? (
                          <CustomButton
                            onClick={() => handleBlockDoctor(doctor.user.id)}
                          >
                            Active{" "}
                          </CustomButton>
                        ) : (
                          <CustomButton
                            onClick={() => handleBlockDoctor(doctor.user.id)}
                            style={{ backgroundColor: "red" }}
                          >
                            Blocked{" "}
                          </CustomButton>
                        )}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AdminDoctorList;
