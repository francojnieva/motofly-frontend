import React, { useContext } from 'react';
import { ProductContext } from './ProductContext';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import offertSlider from '../assets/images/img-slider/slider1.webp'
import offertSlider2 from '../assets/images/img-slider/slider2.webp'


function OfferCarousel() {
  const getProductContextValue = useContext(ProductContext);
  const { products } = getProductContextValue();

  const offerProducts = products.filter((product) => product.category === 'ofertas');

  
  if (offerProducts.length === 0) {
    
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Carousel fade>
          <Carousel.Item>
            <img
              src={offertSlider}
              alt="Placeholder 1"
              className="w-100"
              style={{ maxHeight: '150px' }}
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={offertSlider2}
              alt="Placeholder 2"
              className="w-100"
              style={{ maxHeight: '150px' }}
            />
            <Carousel.Caption>
             
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Carousel fade>
        {offerProducts.map((product) => (
          <Carousel.Item key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img
                src={product.image}
                alt={product.title}
                className="d-block w-100"
                style={{ maxHeight: '150px' }}
              />
              <Carousel.Caption>
                <h1 className='text-dark fw-light'>{product.title}</h1>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
        <Carousel.Item>
            <img
              src={offertSlider}
              alt="Placeholder 1"
              className="d-block w-100"
              style={{ maxHeight: '150px' }}
            />
            <Carousel.Caption>
              
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={offertSlider2}
              alt="Placeholder 2"
              className="d-block w-100"
              style={{ maxHeight: '150px' }}
            />
            <Carousel.Caption>
             
            </Carousel.Caption>
          </Carousel.Item>
      </Carousel>
      
    </div>
  );
 
}

export default OfferCarousel;
