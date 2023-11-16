import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import patientAxiosInstance from '../../../../Axios/PatientAxios'
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from 'react-router-dom';

function Completion() {
  const [messageBody, setMessageBody] = useState('');
  const [stripePromise, setStripePromise] = useState(null);
  const [open, setOpen] = useState(false); 
  useEffect(() => {
    patientAxiosInstance.get("config/")
      .then((response) => {
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
      })
      .catch((error) => {
        console.error('Error fetching publishable key:', error);
        // Handle the error as needed
      });
  }, []);

  useEffect(() => {
    if (!stripePromise) return;

    stripePromise.then(async (stripe) => {
      const url = new URL(window.location);
      const clientSecret = url.searchParams.get('payment_intent_client_secret');
      const { error, paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);

      setMessageBody(error ? `> ${error.message}` : (
        <>&gt; Payment {paymentIntent.status}: <a href={`https://dashboard.stripe.com/test/payments/${paymentIntent.id}`} target="_blank" rel="noreferrer">{paymentIntent.id}</a></>
      ));
      setOpen(true);
      if (paymentIntent.status === 'succeeded') {
        try {
          const appointmentId = localStorage.getItem('appointmentId');
          console.log(appointmentId,'kkkkkkkkkkkk')

          const payload = {
            'appointmentId' :appointmentId,
            'paymentIntentId' :paymentIntent.id
          }
          const response = await patientAxiosInstance.post('payment_success/', payload);
          console.log('Payment details added successfully:', response.data.message);
        } catch (error) {
          console.error('Error adding payment details:', error.message);
      }
    }
      
    });
  }, [stripePromise]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
    style={{
      backgroundImage: `url('https://res.cloudinary.com/da4bmqkkz/image/upload/v1696660327/4142132_n5aeuq.jpg')`, // Set the image as the background
      backgroundSize: 'cover', // Make it cover the entire container
      backgroundPosition: 'center', // Center the image
      width: '90vw', // Full viewport width
      height: '97vh', // Full viewport height
    }}
  >
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }} // Optional: Add a semi-transparent background to the dialog
      >
        <DialogTitle id="alert-dialog-title">{"Thank You!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{color:'black'}}>
            Your payment has been processed successfully. Check your profile for appointment details.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button onClick={handleClose} color="primary" autoFocus>
              Home
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Completion;
