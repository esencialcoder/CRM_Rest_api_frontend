import { useEffect } from "react";
import clienteAxios from "../../config/axios";

export const Clientes = () => {
  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");
    console.log(clientesConsulta);
  };
  useEffect(() => {
    consultarAPI();
  }, []);

  return <h2>Clientes</h2>;
};
