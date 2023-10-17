import React, { useContext, useState, useEffect } from "react";
import { ProductContext } from "./ProductContext";
import { Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export const CreateProduct = () => {
  const getProductContextValue = useContext(ProductContext);

  const { addProduct } = getProductContextValue();

  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    price: 0,
    image: null,
    category: "",
    stock: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setNewProduct({
      ...newProduct,
      image: e.target.files[0],
    });
  };

  const handleAddProduct = async () => {

    if (
      newProduct.title.trim() === "" ||
      newProduct.description.trim() === "" ||
      newProduct.price <= 0 ||
      newProduct.category.trim() === "" ||
      newProduct.image === null ||
      newProduct.stock < 0
    ) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor complete todos los campos",
      })
      return
    }

    const formData = new FormData();

    formData.append("title", newProduct.title);
    formData.append("description", newProduct.description);
    formData.append("price", newProduct.price);
    formData.append("category", newProduct.category);
    formData.append("image", newProduct.image);
    formData.append('stock', newProduct.stock);

    await addProduct(formData);

    setNewProduct({
      title: "",
      description: "",
      price: 0,
      image: null,
      category: "",
    });
    Swal.fire({
      icon: "success",
      title: "Producto creado correctamente",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="container-fluid my-5 d-flex justify-content-center">
      <Form className="border p-3 rounded shadow-lg col-12 row">
        <h2 className="text-start fw-light mb-4">Agregar Nuevo Producto</h2>
        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Título:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            name="title"
            value={newProduct.title}
            onChange={handleInputChange}
            placeholder="Ingrese el título"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Stock:</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            placeholder="Ingrese la cantidad de stock"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Precio:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            placeholder="Ingrese el precio"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Descripción:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            placeholder="Ingrese la descripción"
          />
        </Form.Group>

        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Imagen:</Form.Label>
          <Form.Control
            type="file"
            name="image"
            onChange={handleImageChange}
            accept=".jpg, .jpeg, .png, .webp"
          />
        </Form.Group>
        <Form.Group className="mb-3 text-start fw-medium col-lg-6">
          <Form.Label>Categoría:</Form.Label>
          <Form.Control
            type="text"
            autoComplete="off"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            placeholder="Ingrese la categoría"
          />
        </Form.Group>
        <div>
          <Button
            size="sm"
            className="btn btn-success m-3 col-lg-3"
            onClick={handleAddProduct}
          >
            Agregar producto
          </Button>
        </div>
      </Form>
    </div>
  );
};
