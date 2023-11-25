import React, { useState } from 'react';
import { PaymentElement, LinkAuthenticationElement } from '@stripe/react-stripe-js';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { Grid } from '@mui/material';
import Loader from '../../../Loader/Loader'

// Import the CSS Module from the same folder
import styles from './PaymentStyle.module.css';
import CustomButton from '../../../Helpers/CustomButton';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/patient/completion/`,
      },
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div>
      <Grid container >
        <Grid item xs={12} sm={6} md={6}>
          <img
            src="https://res.cloudinary.com/da4bmqkkz/image/upload/v1696656624/65Z_2201.w012.n001.25B.p12.25_krsp6h.jpg"
            alt="Your Image Alt Text"
            width={'100%'}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}  style={{marginTop:'50px'}}>
          <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />
            <CustomButton id="submit" className={styles.payButton}>
              Pay Now
            </CustomButton>
            {message && (
            <div style={{ color: '#0d9eb5 !important', fontSize: '12px !important' }}>
              {message}
            </div>
          )}

          </form>
        </Grid>
      </Grid>
    </div>
  );
}
