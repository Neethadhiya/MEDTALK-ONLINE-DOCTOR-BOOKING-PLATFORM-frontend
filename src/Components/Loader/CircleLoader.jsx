import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

export default function LinearColor() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Set a timeout to hide the loader after 5 seconds
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 10000); // 5000 milliseconds = 5 seconds

    return () => {
      clearTimeout(timer); // Clear the timeout on component unmounting
    };
  }, []);

  return (
    <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
      {showLoader && (
        <>
          <LinearProgress color="secondary" />
          <LinearProgress color="success" />
          <LinearProgress color="inherit" />
        </>
      )}
    </Stack>
  );
}
