import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight, FiShoppingCart, FiUser, FiInfo } from 'react-icons/fi';
function BreadcrumbPages() {
  const location = useLocation();

  const getPathSegments = (path) => {
    return path.split('/').filter((segment) => segment !== '');
  };

  const pathSegments = getPathSegments(location.pathname);

  
  const iconMap = {
    home: <FiHome className='text-dark' size={18} />,
    shop: <FiShoppingCart className='text-dark' size={18} />,
    about: <FiInfo className='text-dark' size={18} />,
    contact: <FiUser className='text-dark' size={18} />,
    products:<FiShoppingCart className='text-dark' size={18} />,
   
  };

  return (
    <div className="container pt-2">
    <Breadcrumb className="custom-breadcrumb">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        <FiHome className='text-dark' size={18} />
      </Breadcrumb.Item>
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const icon = iconMap[segment.toLowerCase()];

        return (
          <React.Fragment key={index}>
            <FiChevronRight className='icon' size={18} />
            <Breadcrumb.Item linkAs={Link}  linkProps={{ to: path }}>
              {icon}
            </Breadcrumb.Item>
          </React.Fragment>
        );
      })}
    </Breadcrumb>
    </div>
  );
}

export default BreadcrumbPages;
