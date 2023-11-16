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
import adminAxiosInstance from "../../../Axios/AdminAxios";
import { useSelector, useDispatch } from "react-redux";
import CustomButton from "../../Helpers/CustomButton";
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

function AdminPatientList() {
  const defaultTheme = createTheme();
  const [patientList, setPatientList] = useState([]);
  const { adminInfo } = useSelector((state) => state.auth);
  const fetchData = () => {
    adminAxiosInstance
      .get("show_patient_list/")
      .then((response) => {
        setPatientList(response.data.patients);
        console.log("response.data.patients", response.data.patients);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [patientList]);

  const handleBlockPatient = (patientId) => {
    confirmBlock(patientId);
    setPatientList((prevUsers) =>
      prevUsers.map((user) =>
        user.id === patientId ? { ...user, is_active: !user.is_active } : user
      )
    );
  };

  const confirmBlock = async (patientId) => {
    try {
      const response = await adminAxiosInstance.patch(
        `block_patient/${patientId}/`
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
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              overflowX: "auto",
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
                      BLOCK Patient
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patientList.map((patient) => (
                    <StyledTableRow key={patient.id}>
                      <StyledTableCell align="center">
                        {patient.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {patient.first_name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {patient.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {patient.mobile}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {patient.is_active ? (
                          <CustomButton
                            onClick={() => handleBlockPatient(patient.id)}
                          >
                            Active{" "}
                          </CustomButton>
                        ) : (
                          <CustomButton
                            onClick={() => handleBlockPatient(patient.id)}
                            sx={{ backgroundColor: "red" }}
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

export default AdminPatientList;
