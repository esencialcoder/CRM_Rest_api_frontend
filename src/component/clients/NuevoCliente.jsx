import { useState } from "react";
import clienteAxios from "../../config/axios";

export const NuevoCliente = () => {
  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  const actualizarCliente = (event) => {
    setCliente({ ...cliente, [event.target.name]: event.target.value });
  };

  const agregarCliente = (event) => {
    event.preventDefault();

    clienteAxios
      .post("/clientes", cliente)
      .then(() => {
        console.log("Cliente creado correctamente");
      })
      .catch((error) => {
        if (error.response?.data?.code === 11000) {
          console.log("El correo ya está registrado");
        } else {
          console.log("Ha ocurrido otro error:", error.response?.data);
        }
      });
  };
  const validarCliente = () => {
    const { nombre, apellido, empresa, email, telefono } = cliente;
    let valido =
      !nombre.length ||
      !apellido.length ||
      !empresa.length ||
      !email.length ||
      !telefono.length;
    return valido;
  };

  return (
    <>
      <h2>Nuevo cliente</h2>

      <form onSubmit={agregarCliente}>
        <legend>Rellena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={actualizarCliente}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            onChange={actualizarCliente}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa"
            name="empresa"
            onChange={actualizarCliente}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={actualizarCliente}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            onChange={actualizarCliente}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Agregar Cliente"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};
