import React,{useState, useEffect} from 'react'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; 
import MainCarousel from '../../../../Components/Account Component/MainCarousel/MainCarousel'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import patientAxiosInstance from '../../../../Axios/PatientAxios';
import { Link } from "react-router-dom";
import { baseUrl } from '../../../../utils/constants';
import LinearColor from '../../../Loader/CircleLoader';

const specialtiesData = [
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698305046/pediatry_reobmn.jpg',
    title: 'Pediatrics',
  },
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698307834/nephrology_ghucsw.avif',
    title: 'Nephrology',
  },
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698307931/gynacology_zyw2vu.avif',
    title: 'Gynecology',
  },
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698308368/young-male-psysician-with-patient-measuring-blood-pressure_klo6sx.jpg',
    title: 'General Medicine',
  },
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698308709/back-view-woman-patient-wearing-performant-eeg-headset-sitting-chair-neurological-research-laboratory-while-medical-researcher-adjusting-it-examining-nervous-system-typing-tablet_tskxi8.jpg',
    title: 'Neurology',
  },
  {
    image: 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1698308973/female-psychologist-consulting-patient-desk-hospital_xfiiai.jpg',
    title: 'Psychiatry',
  },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  images: [
    'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695971587/clipboard-stethoscope_soebg6.jpg',
    // 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695296416/cdc-OZcQIhidMTw-unsplash_mujpvf.jpg',
    // 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695296679/julia-zyablova-S1v7hVUiCg0-unsplash_vez3j8.jpg',
    // 'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695296723/christian-bowen-I0ItPtIsVEE-unsplash_m82fdy.jpg',
    'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695296764/jonathan-borba-v_2FRXEba94-unsplash_gj75lz.jpg',
    'https://res.cloudinary.com/da4bmqkkz/image/upload/v1695296802/bermix-studio-uyXNXIhisrU-unsplash_gba1pl.jpg',
  ],
};

function PatientDashboard() {
  const defaultTheme = createTheme();
  const [doctorsList, setDoctorsList] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <ThemeProvider theme={defaultTheme}>
    <CssBaseline />
    {loading ? ( // Conditionally render loader if loading is true
      <div style={{marginTop:'300px'}}>
        <LinearColor />
      </div>
      
    ) : (
    <Container maxWidth="lg" sx={{ marginTop: '100px' }}>
      <main>
        <MainCarousel images={mainFeaturedPost.images} />
        <div style={{ display: 'flex', alignItems: 'center',marginTop:'40px' }}>
  <Typography
    sx={{
      fontSize: '30px',
      color: '#0d9eb5',
      marginLeft:'40%',
      marginBottom:'20px',
      marginTop:'50px' // Adjust the margins as needed
    }}
  >
    Our Specialities
  </Typography>
 
</div>

<Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 6 }}>
      {specialtiesData.map((specialty, index) => (
        <Grid key={index} lg={4} xs={12} md={12}>
              <Link to='/patient/find_doctors' style={{textDecoration:'none'}}>

          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <div className="zoom-image-container">
                <CardMedia
                  component="img"
                  image={specialty.image}
                  alt={specialty.title}
                  className="zoom-image"
                  sx={{ height: 240 }}
                />
              </div>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{marginLeft:"25%",color:'#0d9eb5'}}>
                  {specialty.title}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
    <Grid container style={{marginTop:'50px'}}>
      <Grid item xs={12} sm={12} md={6} lg={6}>
      <div className="zoom-image-container">
        <img src='https://res.cloudinary.com/da4bmqkkz/image/upload/v1698645574/work-img_ad5uzd.png'
        className="zoom-image"
        width='90%' />
        </div>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6} >
       <Typography sx={{
        color:'#0d9eb5',
        fontSize:'20px',
        marginTop:'90px'
       }}>
        <strong>About MedTalk</strong>
       </Typography>
       <h2
       style={{
        color:'#00224f',
        fontWeight:'900',
        lineHeight:'55px',
        fontSize:'40px'
       }}>
       <strong>Bring care to your<br/> home with one click</strong>
       </h2>
       <p style={{color:'#808080'}}>
       MedTalk offers online medical consultations, bringing healthcare<br />
        professionals to your home with a single click. Access expert <br /> 
        advice, diagnosis, and treatment recommendations from the convenience <br /> 
        of your own space.
       </p>
      </Grid>
      
    </Grid>

    <div style={{
  
  padding: '30px',
  backgroundImage: 'url("https://res.cloudinary.com/da4bmqkkz/image/upload/v1698834098/v996-026_ywpsrk.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  marginTop:'50px'
 
}}>
  <h2 style={{ textAlign: 'center',color:'#00224f',fontSize:'29px' }}>Appointment Process</h2>
  <Grid container style={{ display: 'flex', flexDirection: 'row', margin: '50px' }}>
    <Grid item xs={12} sm={12} md={4} lg={4} >
    <Card sx={{ maxWidth: 345,padding:'30px' }} className="hover-card">
      <CardMedia
        sx={{ height: 100 }}
        image="https://res.cloudinary.com/da4bmqkkz/image/upload/v1698839659/11_aujd5s.jpg"
        
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
        Discover Top Online Professionals
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Explore a world of excellence with our platform, where you can easily discover the finest 
        online doctors. 
        </Typography>
      </CardContent>
    
    </Card>
    </Grid>
    <Grid item xs={12} sm={12} md={4} lg={4}>
    <Card sx={{ maxWidth: 345 , padding:'30px'}} className="hover-card">
      <CardMedia
        sx={{ height: 100,}}
        image="https://res.cloudinary.com/da4bmqkkz/image/upload/v1698841062/12_nhe5me.jpg"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        View Professional Profile
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Discover in-depth information about your doctor's medical 
        background, specialties, and more. 
        </Typography>
      </CardContent>
    
    </Card>
    </Grid>
    <Grid item xs={12} sm={12} md={4} lg={4} >
    <Card sx={{ maxWidth: 345 ,padding:'30px' }} className="hover-card">
      <CardMedia
        sx={{ height: 100 }}
        image="https://res.cloudinary.com/da4bmqkkz/image/upload/v1698844098/33_zvmlsf.jpg"
        
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        Get Doctor Appoinment
        </Typography>
        <Typography variant="body2" color="text.secondary">
        You can now effortlessly schedule your appointments, 
        ensuring prompt access to the care you require. 
        </Typography>
      </CardContent>
     
    </Card>
    </Grid>
  </Grid>
</div>
<div style={{marginTop: '50px'}}>
  <h4 style={{color:'#0d9eb5',textAlign:'center'}}>MEET OUR PROFESSIONALS</h4>
  <h1 style={{textAlign:'center'}}>Our Top Specialists</h1>
<Grid container spacing={2} style={{ display: 'flex', flexDirection: 'row' }}>
{doctorsList.length > 0 ? (
              doctorsList.map((doctor) => (
  <Grid item xs={12} sm={12} md={6} lg={6} key={doctor.id}>
    <Link to='/patient/find_doctors' style={{textDecoration:'none'}}>
  <Card className="hover-card">
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
                         
                         
                          <Typography variant="body2" color="text.secondary">
                            {doctor.qualification}
                          </Typography>
                          <div >
                            <LocationOnIcon style={{ fontSize: '17px' }}/> {doctor.location}, {doctor.city}
                          </div>
                        </div>
                      </div>
                  
                    </CardContent>
                  </Card>
                  </Link>
  </Grid>
  ))
  ) : (
    <Grid item xs={12}>
      {doctorsList.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No search results found
        </Typography>
      ) : (
        <Typography variant="body2" color="textSecondary">
          Loading
        </Typography>
      )}
    </Grid>
  )}
  

</Grid>
</div>

      </main>
    </Container>
   )}
  </ThemeProvider>
  )
}

export default PatientDashboard
