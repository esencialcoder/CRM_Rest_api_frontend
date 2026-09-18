import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Cliente } from "./Cliente";

export const Clientes = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      try {
        const clientesConsulta = await clienteAxios.get("/clientes");

        setClientes(clientesConsulta.data);
      } catch (error) {
        console.log("Error al consultar a los clientes", error);
      }
    };

    consultarAPI();
  }, []);

  return (
    <>
      <h2>Clientes</h2>
      <ul>
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};
