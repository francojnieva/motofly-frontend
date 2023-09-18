import React from 'react';
import { Link } from 'react-router-dom';
import notFoundImage from '../assets/images/404.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <div className="not-found-container pb-3">
      <img src={notFoundImage} alt="404 Error" className="not-found-image" />
      <h1 className="not-found-title">¡Oops! Página no encontrada</h1>
      <p className="not-found-text">
        Lo sentimos, la página que estás buscando no existe.
      </p>
      <Link to="/" className="not-found-link text-dark my">
      <FontAwesomeIcon icon={faStore} className="icon fs-2 text-dark" /> Volver a la tienda de motos
      </Link>
    </div>
  );
};

export default NotFoundPage;
