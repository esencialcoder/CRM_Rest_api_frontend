import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Cliente } from "./Cliente";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  const consultarAPI = async () => {
    const clientesConsulta = await clienteAxios.get("/clientes");

    setClientes(clientesConsulta.data);
  };

  useEffect(() => {
    consultarAPI();
  }, []);

  return (
    <>
      <h2>Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <Cliente />
        ))}
      </ul>
    </>
  );
};
