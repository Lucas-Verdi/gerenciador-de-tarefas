import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../index.css';

const ImageCarousel = ({ images }) => {
  return (
    <Carousel>
      {images.map((url, index) => (
        <Carousel.Item key={index}>
          <img className="carousel-img d-block w-100" src={url} alt={`Slide ${index}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
