import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { useUserContext } from "./UserContext";

function RegisterForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const [formMessage, setFormMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { setUserData } = useUserContext();

  const onImageSelect = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("userName", data.userName);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.post("https://motofly-deploy-app.onrender.com/api/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormError("");

      reset();
      setSelectedImage(null);

      Swal.fire({
        icon: "success",
        title: "Registro Exitoso",
        text: "Has sido registrado correctamente.",
        timer: 2000,
        showConfirmButton: false,
      });
      const result = await axios.post("https://motofly-deploy-app.onrender.com/api/login", {
        email: data.email,
        password: data.password,
      });

      if (result.data.msg === "Exitoso") {
        setUserData({
          name: result.data.name,
          image: result.data.image,
          role: result.data.role,
        });

        localStorage.setItem(
          "userData",
          JSON.stringify({
            name: result.data.name,
            image: result.data.image,
            role: result.data.role,
          })
        );

        setTimeout(() => {
          setFormMessage("");

          navigate("/");
        }, 2000);
      }
    } catch (err) {
      setFormError("Ha ocurrido un error");
      setFormMessage("");
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center register-container">
      <div className="form-container m-4 col col-md-9 col-lg-6">
        <h2 className="mb-4 fw-bolder">Registro</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
          <div className="mb-4">
            <Controller
              name="userName"
              control={control}
              defaultValue=""
              rules={{
                required: "Por favor, ingrese un nombre de usuario",
                minLength: {
                  value: 3,
                  message:
                    "El nombre de usuario debe tener entre 3 y 20 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "El nombre de usuario debe tener menos de 20 caracteres",
                },
              }}
              render={({ field }) => (
                <input
                  minLength="3"
                  maxLength="20"
                  type="text"
                  placeholder="Nombre de usuario"
                  autoComplete="off"
                  {...field}
                  className="form-control rounded"
                />
              )}
            />
            {errors.userName && (
              <p className="text-danger">{errors.userName.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Por favor, ingrese un correo electrónico",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                  message: "Ingrese una dirección de correo electrónico válida",
                },
                minLength: {
                  value: 6,
                  message:
                    "La dirección de correo debe tener entre 6 y 20 caracteres",
                },
                maxLength: {
                  value: 20,
                  message:
                    "La dirección de correo debe tener menos de 20 caracteres",
                },
              }}
              render={({ field }) => (
                <input
                  minLength="6"
                  maxLength="20"
                  type="email"
                  placeholder="Dirección de correo electrónico"
                  autoComplete="off"
                  {...field}
                  className="form-control rounded"
                />
              )}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
          <div className="mb-4">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Por favor, ingrese una contraseña",
                minLength: {
                  value: 10,
                  message: "La contraseña debe tener entre 10 y 30 caracteres",
                },
                maxLength: {
                  value: 30,
                  message:
                    "La contraseña debe tener menos de 30 caracteres",
                },
              }}
              render={({ field }) => (
                <input
                  minLength="10"
                  maxLength="30"
                  type="password"
                  placeholder="Contraseña"
                  autoComplete="off"
                  {...field}
                  className="form-control rounded"
                />
              )}
            />
            {errors.password && (
              <p className="text-danger">{errors.password.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="profileImage" className="form-label">
              Subir imagen de perfil (opcional):
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              onChange={onImageSelect}
              className="form-control"
            />
          </div>
          {formMessage && (
            <p className="p-2 rounded bg-success text-white">{formMessage}</p>
          )}
          {formError && (
            <p className="p-2 rounded bg-danger text-white">{formError}</p>
          )}
          <div className="text-center mt-2">
            <Button type="submit" variant="danger">
              Registrarme
            </Button>
          </div>
        </form>
        <p className="mb-0 mt-4 text-center">¿Ya tienes una cuenta?</p>
        <div className="text-center mt-3">
          <Link
            to="/login"
            className="link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
