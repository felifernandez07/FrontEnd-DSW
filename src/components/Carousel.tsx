import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import './Carousel.css';

interface CarouselProps {
  images: string[]; // Acepta un array de imágenes
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Función para cambiar la imagen siguiente
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Función para cambiar la imagen anterior
  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Cambiar la imagen cada 3 segundos automáticamente
  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // 3000 ms = 3 segundos
    return () => clearInterval(interval); // Limpiar interval cuando el componente se desmonte
  }, [images.length]);

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <img
          src={images[currentIndex]}
          alt={`Producto ${currentIndex + 1}`}
          className="carousel-image"
        />
      </div>

      <div className="carousel-controls">
        <Button variant="link" onClick={prevImage}>‹</Button>
        <Button variant="link" onClick={nextImage}>›</Button>
      </div>
    </div>
  );
};

export default Carousel;