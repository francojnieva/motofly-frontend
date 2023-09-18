import React, { useState, useContext } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { CartContext } from "./CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartPlus, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";

export const ProductDetail = ({ product: { id, image, title, description, stock, price } }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const newQuantity = quantity;
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
  
  const handleQuantityChange = (amount) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  return (
    <Card key={id} className="product-detail mb-5">
      <Row>
        <Col md={6} className="product-image-col">
          <Card.Img variant="top" src={image} alt={title} className="product-image" />
        </Col>
        <Col md={6}>
          <Card.Body>
            <Card.Title className="product-title fs-2">{title}</Card.Title>
            <Card.Text className="product-description">{description}</Card.Text>
            <div className="product-price text-start">
              <p className="price-label">Precio:</p>
              <h3 className="product-price-value">${price}</h3>
              <p className="price-label mt-3">Stock:</p>
              <h3 className="product-price-value">{stock}</h3>
            </div>
            <div className="product-quantity mt-4 d-flex align-items-center">
              <button className="quantity-button" onClick={() => handleQuantityChange(-1)}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
              <input type="text" className="form-control quantity-input mx-2" value={quantity} readOnly />
              <button className="quantity-button" onClick={() => handleQuantityChange(1)} disabled={quantity >= stock}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </div>
            <div className="d-lg-flex align-items-lg-center mt-3">
              <div className="m-3">
                <Button className="btn btn-primary" onClick={handleAddToCart}>
                  <FontAwesomeIcon icon={faCartPlus} /> Agregar al Carrito
                </Button>
              </div>
              <div>
              <Link to="/*"  >
                <Button className="btn btn-success">
                  <FontAwesomeIcon icon={faShoppingCart} /> Comprar
                </Button>
                </Link>
              </div>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};
