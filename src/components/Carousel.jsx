import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import bannerImage from '@/assets/banner01.png'; // Primer banner
import banner02 from '@/assets/banner02.png';     // Segundo banner

const ImageCarousel = () => {
  return (
    <div className="container-fluid p-0" style={{ maxHeight: '300px', overflow: 'hidden' }}>
      <Carousel 
        autoPlay 
        infiniteLoop 
        showThumbs={false} 
        showStatus={false}
        interval={5000}
      >
        <div>
          <img 
            src={bannerImage} 
            alt="Promoción Descuentos" 
            className="w-100" 
            style={{ height: '300px', objectFit: 'cover' }} 
          />
        </div>
        <div>
          <img 
            src={banner02} 
            alt="Promoción 2" 
            className="w-100" 
            style={{ height: '300px', objectFit: 'cover' }} 
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
