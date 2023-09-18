import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null);
  const navigate = useNavigate();

  const logout = () => {
    setUserData(null);
    localStorage.removeItem('userData');
    localStorage.removeItem("token");
    navigate("/login");
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post("https://motofly-deploy-app.onrender.com/api/login", {
        email,
        password,
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


        Swal.fire({
          icon: "success",
          title: `¡Bienvenido, ${result.data.name}!`,
          text: "Has iniciado sesión correctamente.",
          timer: 1000,
        });

        if (result.data.role === "admin") {
                localStorage.setItem("token", JSON.stringify(result.data.token));
          navigate("/manageProducts");
        } else {
          navigate("/");
        }
      } else {
        setErrorDate("");
        setTimeout(() => {
          setErrorDate("Los datos no son correctos");
        }, 1000);
      }
    } catch (err) {
      setFormError("Ha ocurrido un error");
      setFormMessage("");
      console.log(err);
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, logout, login }}>
      {children}
    </UserContext.Provider>
  );
};
