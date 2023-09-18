import React, { useContext, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CartContext } from './CartContext';
import Swal from 'sweetalert2'; 

export const ItemProduct = ({ product: { id, title, description, image, price, stock } }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);

  const handleAddToCart = () => {
    const newQuantity = quantity + 1;
    if (newQuantity > stock) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La cantidad seleccionada supera el stock disponible.',
      });
    } else {
      addToCart({ id, title, description, image, price, quantity: newQuantity, stock });
      setQuantity(newQuantity);
    }
  };
  
  return (
    <Card className="product-card">
      <Link to={`/products/${id}`} state={{ id, image, title, description, price }}>
        <Card.Img variant="top" src={image} alt={title} className="product-card-image" />
      </Link>
      <Card.Body>
        <Card.Title className="product-card-title">{title}</Card.Title>
        <div className="product-card-bottom">
          <div className="product-card-rating">
            <span className="product-card-rating-text fw-medium">Precio:</span>
          </div>
          <div className="product-card-price">${price}</div>
        </div>
        <hr />
        <Button className="product-card-button btn btn-danger" onClick={handleAddToCart}>
          Agregar al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
};
