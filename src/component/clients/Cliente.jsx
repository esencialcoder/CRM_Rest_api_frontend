import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../../config/axios";

export const Cliente = ({ cliente }) => {
  const { _id, nombre, apellido, empresa, email, telefono } = cliente;

  const eliminarCliente = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Los datos eliminados no se pueden recuperar!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value)
        clienteAxios.delete(`/clientes/${id}`).then((res) => {
          Swal.fire({
            title: "Eliminado!",
            text: res.data.message,
            icon: "success",
          });
        });
    });
  };

  return (
    <li className="cliente">
      <div className="info-cliente">
        <p className="nombre">
          {nombre} {apellido}
        </p>
        <p className="empresa">{empresa}</p>
        <p>{email}</p>
        <p>{telefono}</p>
      </div>
      <div className="acciones">
        <Link to={`/clientes/editar/${_id}`} className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </Link>
        <button
          type="button"
          className="btn btn-rojo btn-eliminar"
          onClick={() => eliminarCliente(_id)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};
