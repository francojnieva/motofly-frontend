import { ListProduct } from "./ListProduct";
import { ProductContext } from "./ProductContext";
import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 

export const ShopPage = ({ category: propCategory }) => {
  const getProductContextValue = useContext(ProductContext);

  const { products,} = getProductContextValue();
  const { category: urlCategory } = useParams();

  const selectedCategory = propCategory || urlCategory;
  
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    : products;
   
  return (
    <>
      <div className="container-fluid">
        <ListProduct products={filteredProducts} />
      </div>
    </>
  );
};
