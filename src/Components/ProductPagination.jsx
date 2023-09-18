import React, { useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { ShopPage } from "../Components/ShopPage";

function ProductPagination() {
  const [category, setCategory] = useState('nuevo'); 

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <Tabs
      activeKey={category}
      onSelect={(selectedCategory) => handleCategoryChange(selectedCategory)}
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="nuevo" title="Nuevo">
        <ShopPage category="" />
      </Tab>
      <Tab eventKey="ofertas" title="Ofertas">
        <ShopPage category="ofertas" />
      </Tab>
      <Tab eventKey="destacados" title="Destacados">
        <ShopPage category="destacados" />
      </Tab>
      <Tab eventKey="outlet" title="Oulet" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default ProductPagination;
