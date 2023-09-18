import { useState } from "react";

export const useCompra = () => {
  const [cantidadProductos, setCantidadProductos] = useState(0);

  const comprar = () => {
    setCantidadProductos(cantidadProductos + 1);
  };

   return {
    cantidadProductos,
    comprar
  };
};



const getData = async (URL) => {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
};
export { getData };
