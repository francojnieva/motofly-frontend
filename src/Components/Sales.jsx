import React from 'react'
import '../styles/Sales.css'
import OfferCarousel from './OfferCarousel';
import banner from "../assets/images/img-slider/banner.jpg"
import banner2 from "../assets/images/img-slider/banner2.webp"
import { Link } from 'react-router-dom';

function Sales() {
  return (
    <div className="row mt-4 d-flex justify-content-center aling-items-center flex-column flex-lg-row container-fluid m-0">
        <div className='col-12 col-lg-6'>
          <Link to="products/64d80909ac95a9aa7c386961">
            <img  className='banner my-2' src={banner} alt="banner de guantes" />
          </Link>
        </div>
        <div className='col-12 col-lg-6'>
          <Link to="products/64d80751ac95a9aa7c386951">
            <img  className='banner my-2' src={banner2} alt="banner de camperas" />
          </Link>
        </div>
    </div>
  );
}

export default Sales;

