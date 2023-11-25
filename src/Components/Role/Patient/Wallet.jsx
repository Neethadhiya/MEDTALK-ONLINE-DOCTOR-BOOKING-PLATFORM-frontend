import React, { useState, useEffect } from "react";
import patientAxiosInstance from "../../../Axios/PatientAxios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CustomButton from "../../Helpers/CustomButton";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";

function Wallet() {
  const [amount, setAmount] = useState("");
  const fetchData = () => {
    patientAxiosInstance
      .get(`show_wallet_balance/`)
      .then((response) => {
        setAmount(response.data.balance);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
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
        <h2 style={{ color: "#0d9eb5" }}>My Wallet</h2>

        {amount ? (
          <Card sx={{ minWidth: 645, color: "gray", marginBottom: "70px",
           marginLeft: { md: "35px", xs: "10px" },
                marginRight: { md: "55px", xs: "10px" }  }}>
            <CardContent>
              <Grid
                container
                spacing={2}
                
              >
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" sx={{ color: "black", textAlign:'center' }}>
                    <strong>Total Available Balance</strong>
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" sx={{ color: "black", textAlign:'center' }}>
                    <strong> ₹{amount}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="subtitle1" sx={{ color: "black", textAlign:'center' }}>
                    <strong> Please Note</strong>
                    

                  </Typography>
                  <ul>
                      <li>
                      Medtalk Credit can't be cancelled or transferred to another account.
                      </li>
                      <li>
                        It can't be withdrawn in the form of cash or transferred to any account.
                      </li>
                      <li>
                        Net-banking and credit/debit cards issued in India can be used for Medtalk Credit top up.
                      </li>
                    </ul>
                </Grid>

             
              
              </Grid>
            </CardContent>
          </Card>
        ) : (
          <p>Loading your details</p>
        )}
      </Box>
    </Container>
  );
}

export default Wallet;
