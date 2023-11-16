import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainCarousel from "../../../../Components/Account Component/MainCarousel/MainCarousel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import CustomButton from "../../../Helpers/CustomButton";
import { useSelector } from "react-redux";
import doctorAxiosInstance from "../../../../Axios/DoctorAxios";
import "./DoctorDashboard.css";
import { Routes, Route, Link } from "react-router-dom";
import { baseUrl } from "../../../../utils/constants";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";
import Container from "@mui/material/Container";
import { BarChart } from "@mui/x-charts/BarChart";

function DoctorDashboard() {
  const [months, setMonthsData] = useState([]);
  const [income, setIncomeData] = useState([]);
  const fetchData = () => {
    doctorAxiosInstance
      .get(`get_doctor_chart/`)
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data) {
          setMonthsData(response.data.months || []);
          setIncomeData(response.data.doctor_fees || []);
        } else {
          // Handle the case where the response data is empty or undefined
          console.error("API response data is empty or undefined.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="app" style={{ minHeight: "120vh" }}>
      <DoctorSidebar />

      <Container maxWidth="xl" style={{ marginTop: "0px" }}>
        {months.length > 0 && income.length > 0 ? (
          <>
            <h2 style={{ color: "#0d9eb5" }}> Monthly Income</h2>
            <div style={{ marginBottom: "30px" }}>
              <BarChart
                xAxis={[{ scaleType: "band", data: months }]}
                series={[{ data: income }]}
                width={500}
                height={300}
                yAxis={[
                  {
                    label: "Income (in ₹)", // Set the label for the y-axis
                  },
                ]}
              />
            </div>
          </>
        ) : (
          <img
            src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1699943647/16550_uq579s.jpg"
            alt="Placeholder"
            height="75%"
            width="100%"
          />
        )}
      </Container>
    </div>
  );
}

export default DoctorDashboard;
