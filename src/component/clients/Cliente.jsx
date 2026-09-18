export const Cliente = ({ cliente }) => {
  const { nombre, apellido, empresa, email, telefono } = cliente;
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
        <a href="#" className="btn btn-azul">
          <i className="fas fa-pen-alt"></i>
          Editar Cliente
        </a>
        <button type="button" className="btn btn-rojo btn-eliminar">
          <i className="fa-solid fa-pen-to-square"></i>
          Eliminar Cliente
        </button>
      </div>
    </li>
  );
};
