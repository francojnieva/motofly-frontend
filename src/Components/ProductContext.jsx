import React, { createContext, useState, useEffect } from "react";
import { getData } from "../Utils/Function";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

 const URL = "https://motofly-deploy-app.onrender.com/api";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getData(`${URL}/products`);
        const data = response.getProducts;
       
        const transformedProducts = data.map((product) => ({
          id: product._id,
          title: product.title,
          category: product.category,
          description: product.description,
          price: product.price,
          stock: product.stock,
          image: product.photo,
        }));

        setProducts(transformedProducts);
        
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      const res = await fetch(`${URL}/products/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      } else {
        console.error("Error al eliminar el producto:", res.statusText);
      }
    } catch (error) {
      console.error("Error en la petición de eliminación:", error);
    }
  };

  const editProduct = async (productId, updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append("title", updatedProduct.title);
      formData.append("description", updatedProduct.description);
      formData.append("price", updatedProduct.price);
      formData.append("category", updatedProduct.category);
      formData.append("stock", updatedProduct.stock);
      formData.append("image", updatedProduct.image);
      const res = await fetch(`${URL}/products/edit-product/${productId}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId ? updatedProduct : product
          )
        );
      }
    } catch (error) {
   
    }
  };

  const addProduct = async (formData) => {
    
    try {
      const res = await fetch(`${URL}/products/create-product`, {
        method: "POST",
        body: formData,
      });
    } catch (error) {
      
    }
  };

  const getProductContextValue = () => ({
    products,
    deleteProduct,
    editProduct,
    addProduct,
  });

  return (
    <ProductContext.Provider value={getProductContextValue}>
      {children}
    </ProductContext.Provider>
  );
};
