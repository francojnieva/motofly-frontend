import { useState, useContext } from 'react';
import { Route, Link, Routes } from 'react-router-dom';
import { Tab, Tabs, Dropdown } from 'react-bootstrap';
import HomePage from './HomePage';
import { ShopPage } from "../Components/ShopPage";
import AboutPage from './AboutPage';
import { ContactPage } from './ContactPage';
import { ProductDetailContainer } from "../Components/ProductDetailContainer";
import ProductManagement from "./ProductManagement";
import LoginForm from './LoginForm';
import { ProductContext } from './ProductContext';
import RegisterForm from './RegisterForm';
import NotFoundPage from './NotFoundPage';


function NavPages() {
  const [activeTab, setActiveTab] = useState('home');
  const getProductContextValue = useContext(ProductContext);
  const token = JSON.parse(localStorage.getItem('token')) || ''
  const { products } = getProductContextValue();
  

  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };

  const categories = Array.from(new Set(products.map(product => product.category)));


  return (
    <>
      <div className='d-flex flex-column flex-lg-row tabPages-container'>
        <div className='col-md-2 tabPages pe-0'>
          <Dropdown >
            <Dropdown.Toggle variant="danger" id="dropdown-basic" className="pe-0 w-100 ">
              Categorías
            </Dropdown.Toggle>

            <Dropdown.Menu  className="dropdown-menu-start w-100">
              {categories.map((category) => (
                <Dropdown.Item key={category} as={Link} to={`/category/${category.toLowerCase()}`}>
                  {category}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className='p-0 col-md-10'>
          <Tabs
            activeKey={activeTab}
            onSelect={handleTabSelect}
            id="uncontrolled-tab-example"
            
          >
            <Tab eventKey="home" title={<Link className='link-underline link-underline-opacity-0 text-black fs-mediun' to="/">Inicio</Link>} />
            <Tab eventKey="shop" title={<Link className='link-underline link-underline-opacity-0 text-black fs-mediun' to="/shop">Tienda</Link>} />
            <Tab eventKey="about" title={<Link className='link-underline link-underline-opacity-0 text-black fs-mediun'to="/about">Nosotros</Link>} />
            <Tab eventKey="contact" title={<Link className='link-underline link-underline-opacity-0 text-black fs-mediun'to="/contact">Contacto</Link>} />
            {
              token &&
              <Tab eventKey="managet" title={<Link className='link-underline link-underline-opacity-0 text-black fs-mediun'to="/manageProducts">Administrar</Link>} />
            }
          </Tabs>
        </div>
      </div>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/products/:id" element={<ProductDetailContainer />} />
        <Route path="/category/:category" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/manageProducts" element={<ProductManagement />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </>
  );
}

export default NavPages;
