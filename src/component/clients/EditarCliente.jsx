import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clienteAxios from "../../config/axios";
import Swal from "sweetalert2";

export const EditarCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    apellido: "",
    empresa: "",
    email: "",
    telefono: "",
  });

  useEffect(() => {
    const consultarAPI = async () => {
      const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);
      setCliente(clienteConsulta.data);
    };
    consultarAPI();
  }, [id]);

  const actualizarState = (event) => {
    setCliente({ ...cliente, [event.target.name]: event.target.value });
  };

  const actualizarCliente = (e) => {
    e.preventDefault();

    clienteAxios
      .put(`/clientes/${cliente._id}`, cliente)
      .then((res) => {
        return Swal.fire(
          "¡Cliente actualizado!",
          "Se actualizó correctamente",
          "success",
        ).then(() => {
          navigate("/");
        });
      })

      .catch((error) => {
        if (error.response?.data?.code === 11000) {
          Swal.fire(
            "Correo duplicado",
            "El correo ya está registrado",
            "error",
          ).then(() => {
            navigate("/");
          });
        } else {
          Swal.fire(
            "Error",
            error.response?.data?.message || "No se pudo crear el cliente",
            "error",
          ).then(() => {
            navigate("/");
          });
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
      <h2>Editar cliente</h2>

      <form onSubmit={actualizarCliente}>
        <legend>Rellena todos los campos</legend>

        <div className="campo">
          <label>Nombre:</label>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={actualizarState}
            value={cliente.nombre}
          />
        </div>

        <div className="campo">
          <label>Apellido:</label>
          <input
            type="text"
            placeholder="Apellido"
            name="apellido"
            onChange={actualizarState}
            value={cliente.apellido}
          />
        </div>

        <div className="campo">
          <label>Empresa:</label>
          <input
            type="text"
            placeholder="Empresa"
            name="empresa"
            onChange={actualizarState}
            value={cliente.empresa}
          />
        </div>

        <div className="campo">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={actualizarState}
            value={cliente.email}
          />
        </div>

        <div className="campo">
          <label>Teléfono:</label>
          <input
            type="tel"
            placeholder="Teléfono"
            name="telefono"
            onChange={actualizarState}
            value={cliente.telefono}
          />
        </div>

        <div className="enviar">
          <input
            type="submit"
            className="btn btn-azul"
            value="Guardar cambios"
            disabled={validarCliente()}
          />
        </div>
      </form>
    </>
  );
};
