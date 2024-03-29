import React, { useContext, useState } from "react";
import { Button, Table, Image, Form, Modal } from "react-bootstrap";
import { ProductContext } from "./ProductContext";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";

export const TableProductManaget = () => {
  const getProductContextValue = useContext(ProductContext);
  const { products, deleteProduct, editProduct } = getProductContextValue();

  const [showModal, setShowModal] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    _id: "",
    title: "",
    description: "",
    price: 0,
    image: "",
    category: "",
    stock: 0
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleEditProduct = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProduct({ ...productToEdit });
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setEditedProduct({
      ...editedProduct,
      image: selectedImage,
    });
  };

  const handleCloseEditModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({
      ...editedProduct,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};

    if (!editedProduct.title) {
      errors.title = "El título es obligatorio.";
    } else if (editedProduct.title.length > 20) {
      errors.title = "El título debe tener hasta 20 caracteres.";
    }

    if (!editedProduct.description) {
      errors.description = "La descripción es obligatoria.";
    } else if (editedProduct.description.length > 250) {
      errors.description = "La descripción debe tener hasta 250 caracteres.";
    }

    const regexPrice = /^[1-9]\d*(\.\d+)?$/
    if (!editedProduct.price) {
      errors.price = "El precio es obligatorio";
    } else if (!regexPrice.test(editedProduct.price)) {
      errors.price = "El precio debe ser mayor a cero. Si no es un entero, asegurate de que termine con al menos un dígito después del punto";
    }

    const regexStock = /^[1-9]\d*$/
    if (!editedProduct.stock) {
      errors.stock = "El stock es obligatorio";
    } else if (!regexStock.test(editedProduct.stock)) {
      errors.stock = "El stock debe ser un número entero positivo";
    }

    if (!editedProduct.category) {
      errors.category = "La categoría es obligatoria.";
    } else if (editedProduct.category.length > 15) {
      errors.category = "La categoría debe tener hasta 15 caracteres.";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSaveChanges = () => {
    const isFormValid = validateForm();

    if (isFormValid) {
      editProduct(editedProduct.id, editedProduct);
      setShowModal(false);

      Swal.fire({
        icon: "success",
        title: "¡Cambios guardados!",
        text: "Los cambios han sido guardados correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleDeleteProduct = (productId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Una vez eliminado, no podrás recuperar el producto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(productId);

        Swal.fire(
          "¡Eliminado!",
          "El producto ha sido eliminado correctamente",
          "success"
        );
      }
    });
  };

  return (
    <div>
      <h2 className="fw-light text-start py-3">Administrar Productos</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Producto</th>
            <th className="d-none">Descripción</th>
            <th className="d-none">Categoría</th>
            <th className="d-none">Precio</th>
            <th className="d-none">Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <Image
                  src={product.image}
                  alt={product.title}
                  rounded
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td className="title-fs">{product.title}</td>
              <td className="d-none">{product.description}</td>
              <td className="d-none">{product.category}</td>
              <td className="d-none">${product.price}</td>
              <td className="d-none">{product.stock}</td>

              <td className="">
                <div>
                  <FiEdit
                    className="fs-2 text-success IconManage"
                    onClick={() => handleEditProduct(product.id)}
                  />
                  <FiTrash2
                    className="fs-2 text-danger IconManage"
                    onClick={() => handleDeleteProduct(product.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Título</Form.Label>
              <Form.Control
                type="text"
                name="title"
                maxLength={20}
                autoComplete="off"
                value={editedProduct.title}
                onChange={handleInputChange}
              />
              {validationErrors.title && (
                <div className="text-danger">{validationErrors.title}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Descripción</Form.Label>
              <Form.Control
                type="text"
                name="description"
                maxLength={250}
                autoComplete="off"
                value={editedProduct.description}
                onChange={handleInputChange}
              />
              {validationErrors.description && (
                <div className="text-danger">{validationErrors.description}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                autoComplete="off"
                value={editedProduct.price}
                onChange={handleInputChange}
              />
              {validationErrors.price && (
                <div className="text-danger">{validationErrors.price}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                autoComplete="off"
                value={editedProduct.stock}
                onChange={handleInputChange}
              />
              {validationErrors.stock && (
                <div className="text-danger">{validationErrors.stock}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                maxLength={15}
                autoComplete="off"
                value={editedProduct.category}
                onChange={handleInputChange}
              />
              {validationErrors.category && (
                <div className="text-danger">{validationErrors.category}</div>
              )}
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bolder mt-2">Imagen</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleImageChange}
              />
              {editedProduct.image && (
                <Image
                  src={editedProduct.image}
                  alt="Product"
                  className="mt-2"
                  style={{ maxWidth: "100px" }}
                />
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
