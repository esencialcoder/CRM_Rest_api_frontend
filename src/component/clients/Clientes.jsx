import { useEffect, useState } from "react";
import clienteAxios from "../../config/axios";
import { Cliente } from "./Cliente";
import { Link } from "react-router-dom";

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
  }, [clientes]);

  return (
    <>
      <h2>Clientes</h2>
      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul>
        {clientes.map((cliente) => (
          <Cliente key={cliente._id} cliente={cliente} />
        ))}
      </ul>
    </>
  );
};
