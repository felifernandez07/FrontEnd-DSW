import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('/api/products/featured')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  // Configuración del carrusel
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Cambia este valor según cuántos productos quieras mostrar a la vez
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }
    ]
  };


  return (
    <div>
      <h2> Productos Destacados</h2>
      <Slider {...settings}>
        {products.length > 0 ? (
          products.map(product => (
          <div key={product.id} style={{ padding: '20px', textAlign: 'center' }}>
            <img 
              src={product.image || "/placeholder-image.png"} 
              alt={product.name} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
            />
            <h3>{product.name || "producto sin nombre"}</h3>
            <p>${product.price ? product.price.toFixed(2) : "N/A"}</p>
          </div>
        )) 
      ): (
          <p style={{ textAlign: 'center' }}>Cargando productos...</p>
        )}
      </Slider>
    </div>
  );
}

export default FeaturedProducts;