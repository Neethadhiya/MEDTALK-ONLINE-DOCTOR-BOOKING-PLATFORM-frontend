import React, { useState,useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { loadStripe } from '@stripe/stripe-js';
import patientAxiosInstance from '../../../../Axios/PatientAxios'
import CircularProgress from '@mui/material/CircularProgress'; // Import CircularProgress from Material-UI
import LinearColor from '../../../Loader/CircleLoader';

function Payment({ id }) {
  const [clientSecret, setClientSecret] = useState('');
  const [stripePromise, setStripePromise] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    patientAxiosInstance
      .get('config/')
      .then((response) => {
        const { publishableKey } = response.data;
        setStripePromise(loadStripe(publishableKey));
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching publishable key:', error);
        setLoading(false);

      });
  }, []);

  useEffect(() => {
    setLoading(true);

    patientAxiosInstance
      .post(`create-payment-intent/${id}/`)
      .then((response) => {
        const { clientSecret } = response.data;
        setClientSecret(clientSecret);
        setLoading(false);

      })
      .catch((error) => {
        // Handle any error that occurs during the request
        console.error('Error creating PaymentIntent:', error);
        setLoading(false);

      });
  }, []);

  const isLoading = !clientSecret || !stripePromise; // Determine loading state

  return (
    <>
     {loading ? ( // Conditionally render loader if loading is true
      <div style={{marginTop:'300px'}}>
        <LinearColor />
      </div>
      
    ) : (
    <div>
      <h2 style={{textAlign:'center',color:'#0d9eb5'}}>
         Stripe Payment<img 
             src='https://res.cloudinary.com/da4bmqkkz/image/upload/v1696585540/ibook_pvx4cz.svg' 
             style={{marginTop:'50px'}}/></h2>
        
      {isLoading ? (
        // Display CircularProgress while loading
        <CircularProgress />
      ) : (
        // Render Elements and CheckoutForm when not loading
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
      </div>
        )}
    </>
  );
}

export default Payment;
