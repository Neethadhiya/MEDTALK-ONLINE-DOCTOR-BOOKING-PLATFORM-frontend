import React from 'react';
import { Grid, Container, Typography } from '@mui/material';

const footerStyles = {
  backgroundColor: '#0d9eb5',
  color:  'white',
  padding: '16px',
  height:'30px',
  marginTop:'20px',
  // position :'fixed',
  // bottom:0,
width:'98%',
};
const commentsStyles = {
  marginTop: '0px',
};

function Footer() {
  return (
    <footer style={footerStyles}>
      <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} md={4} style={{ display: 'flex', flexDirection: 'column' }}></Grid>
          {/* Second Column: Comments */}
          <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column' }}>
   
            <Typography sx={{fontSize:'12px'}} style={commentsStyles}>
              Pan India Experts | Available 24/7 | Private Consultation
            </Typography>
            <Typography  style={commentsStyles} sx={{fontSize:'8px',marginLeft:'70px'}}>
            Copyright © 2023, MedTalk. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
