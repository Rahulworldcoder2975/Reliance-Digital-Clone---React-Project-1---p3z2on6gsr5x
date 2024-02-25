import { Paper, IconButton } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import Carousel from 'react-material-ui-carousel';

const Slider = () => {
  const [activeStep, setActiveStep] = useState(0);
  const images = [
    'https://e1.pxfuel.com/desktop-wallpaper/1/707/desktop-wallpaper-bhim-jayanti-128-bhim-jayanti-banner-backgrounds-and-by-sagar-jadhav-aurangabad-marathi-ca%E2%80%A6.jpg',
    'https://www.shutterstock.com/image-photo/back-school-concept-stack-books-260nw-1160400937.jpg',
    'https://png.pngtree.com/template/20220505/ourlarge/pngtree-winter-men-s-boots-warm-boots-leather-men-s-shoes-poster-image_1494841.jpg',
   'https://img.freepik.com/premium-psd/headphone-brand-product-facebook-cover-banner-design_268949-35.jpg',
    'https://img.freepik.com/free-psd/black-friday-super-sale-web-banner-template_120329-1094.jpg',
    'https://img.freepik.com/premium-psd/horizontal-website-banne_451189-110.jpg'
    
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => (prevStep + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveStep((prevStep) => (prevStep - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change image every 3000 milliseconds (3 seconds)
    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel
      activeStep={activeStep}
      autoPlay={true}
      indicators={false}
      animation="slide"
      timeout={500}
      swipe
      navButtonsAlwaysVisible
      NextIcon={
        <IconButton onClick={handleNext} color="primary">
          <KeyboardArrowRight />
        </IconButton>
      }
      PrevIcon={
        <IconButton onClick={handlePrev} color="primary">
          <KeyboardArrowLeft />
        </IconButton>
      }
    >
      {images.map((image, index) => (
        <Paper key={index} style={{ height: '70vh', overflow: 'hidden' }}>
          <img
            src={image}
            alt={`Slide ${index}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Paper>
      ))}
    </Carousel>
  );
};

export default Slider;
