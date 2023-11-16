import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function MainCarousel({ images }) {
  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      showStatus={false}
      autoPlay={true} // Enable automatic sliding
      infiniteLoop={true} // Loop from the last slide back to the first
      interval={1500} // Set the interval between slides (in milliseconds)
      transitionTime={300} // Set the transition time (in milliseconds)
    >
      {images.map((imageUrl, index) => (
        <div key={index}>
          <img src={imageUrl} alt={`Image ${index}`} style={{ maxHeight: '400px' }} />
        </div>
      ))}
    </Carousel>
  );
}

export default MainCarousel;
