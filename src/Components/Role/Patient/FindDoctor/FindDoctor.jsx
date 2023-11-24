import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import MainCarousel from "../../../../Components/Account Component/MainCarousel/MainCarousel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import patientAxiosInstance from "../../../../Axios/PatientAxios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { baseUrl } from "../../../../utils/constants";
import CustomButton from "../../../Helpers/CustomButton";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinearColor from "../../../Loader/CircleLoader";

const mainFeaturedPost = {
  title: "Title of a longer featured blog post",
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  images: [
    "https://res.cloudinary.com/da4bmqkkz/image/upload/v1696087130/6244775_pla5ac.jpg",
  ],
};


const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid #ccc",
  marginBottom: "15px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

function FindDoctor() {
  const defaultTheme = createTheme();
  const [doctorsList, setDoctorsList] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  const [searchMessage, setSearchMessage] = useState("");
  const fetchData = () => {
    setLoading(true);
    patientAxiosInstance
      .get("show_doctors_list/")
      .then((response) => {
        setDoctorsList(response.data.doctors);
        setLoading(false);

      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchSearchData = () => {
    const searchParams = new URLSearchParams();
    searchParams.append("search", searchInput);
    patientAxiosInstance
      .get(`search_doctors/?${searchParams.toString()}`)
      .then((response) => {
        if (
          Array.isArray(response.data.data) &&
          response.data.data.length === 0
        ) {
          setSearchMessage("No search results found");
          setDoctorsList([]);
        } else {
          setSearchMessage("");
          setDoctorsList(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    fetchSearchData();
  }, [searchInput]);
  return (
    <ThemeProvider theme={defaultTheme}>
        {loading ? ( // Conditionally render loader if loading is true
      <div style={{marginTop:'300px'}}>
        <LinearColor />
      </div>
      
    ) : (
      <Container maxWidth="lg" spacing={3}>
        <Grid item xs={12} style={{ marginTop: "90px" }}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Specialization or City"
              inputProps={{
                "aria-label": "search by specialization or City",
              }}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Search>
        </Grid>

        <Grid item xs={12}>
          <Grid>
            <MainCarousel images={mainFeaturedPost.images} />
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginTop: "20px" }}>
          <Grid container spacing={2}>
            {doctorsList.length > 0 ? (
              doctorsList.map((doctor) => (
                <Grid item xs={12} key={doctor.id}>
                  <Card>
                    <CardContent
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <img
                          src={`${baseUrl}${doctor.profileImage}`} // Replace with your image URL
                          alt={doctor.user.first_name}
                          style={{
                            width: "100px",
                            height: "100px", // Set the height to match the width for a round image
                            borderRadius: "50%", // Make the image round by setting border-radius to 50%
                            objectFit: "cover", // Ensure the image covers the round container
                          }}
                        />
                        <div style={{ marginLeft: "30px" }}>
                          <Typography variant="h5" component="div">
                            Dr. {doctor.user.first_name}
                          </Typography>

                          <Typography variant="body2" color="text.secondary">
                            {doctor.specialization}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.experience} years experience overall
                          </Typography>
                          {/* <Typography variant="body2" color="text.secondary">
                            Chat consultation fees - {doctor.chat_fees}
                          </Typography> */}
                          <Typography variant="body2" color="text.secondary">
                            Video consultation fees -{doctor.online_fees}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {doctor.qualification}
                          </Typography>
                          <div >
                            <LocationOnIcon style={{ fontSize: '17px' }}/> {doctor.location}, {doctor.city}
                          </div>
                          {/* <Typography variant="body2" color="text.secondary">
                            {doctor.location}, {doctor.city}
                          </Typography> */}
                        </div>
                      </div>
                      <img src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1696585644/ifollowups_1_guchla.svg" />
                      <Link to={`/patient/check_availability/${doctor.id}`}>
                        <CustomButton>Check Availability</CustomButton>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                {doctorsList.length === 0 ? (
                  
                  <img src='https://res.cloudinary.com/da4bmqkkz/image/upload/v1699966047/AdobeStock_98244593_Preview_m4q1pn.jpg' 
                  width='50%px' height='50%'/>
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    Loading
                  </Typography>
                )}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Container>
       )}
    </ThemeProvider>
  );
}

export default FindDoctor;