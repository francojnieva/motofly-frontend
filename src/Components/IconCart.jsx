
import React, { useContext, useState } from 'react';
import { FaOpencart } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap';
import { CartContext } from './CartContext';
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from 'react-router-dom';

export const IconCart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const [mostrarResumen, setMostrarResumen] = useState(false);

  const toggleResumen = () => {
    setMostrarResumen(!mostrarResumen);
  };

  const totalProductos = cartItems.length;

  const calcularTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity; 
    });
    return total.toFixed(2);
  };

  return (
    <Dropdown className='number-cart-container'>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <span className="iconCart badge rounded-pill badge-notification">
          {totalProductos}
        </span>
        <FaOpencart className="text-light  pt-3 pe-0 border-0 open-cart-icon" onClick={toggleResumen} />
      </Dropdown.Toggle>

      <Dropdown.Menu show={mostrarResumen}>
        <div className="resumenCarrito p-4">
          <h4>Resumen del carrito</h4>
          <hr />
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              
              <div key={item.id} className="productoCarrito d-flex mb-3">
                <img src={item.image} alt={item.title} className="productoCarrito-img" />
                <div className="productoCarrito-info p-2">
                  <p className="">{item.title}</p>
                  <span className='fw-bolder'>Cantidad: {item.quantity}</span> 
                </div>
                <span className="ms-auto p-2 fw-bolder">${item.price * item.quantity}</span> 
                <div className='d-flex align-items-start flex-column mb-5'>
                <TiDeleteOutline className="deleteIcon " onClick={() => removeFromCart(item.id)} />
                </div>
              </div>
            ))
          ) : (
            <p>El carrito está vacío.</p>
          )}
          <hr />
          <div className="d-flex justify-content-between">
            <h6 className='fw-bolder'>Total</h6>
            <span className='fw-bolder'>${calcularTotal()}</span>
          </div>
          <div className="accionesCarrito">
            <Link to="/*"  >
            <button className="btn btn-primary">Comprar</button>
            </Link>
            <button  className="btn btn-danger" onClick={clearCart}>Vaciar Carrito</button>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};
