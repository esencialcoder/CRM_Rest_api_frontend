import Clientes from "../models/Clientes.js";

export const nuevoCliente = async (req, res) => {
  const cliente = new Clientes(req.body);
  try {
    await cliente.save();
    return res
      .status(201)
      .json({ message: "Cliente creado correctamente", cliente });
  } catch (error) {
    return res.status(500).json({ code: error.code, message: error.message });
  }
};

export const mostrarClientes = async (req, res) => {
  try {
    const clientes = await Clientes.find({});
    return res.json(clientes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// muestra un cliente por ID
export const mostrarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.json(cliente);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { returnDocument: "after" },
    );
    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    return res.json({ message: "Cliente actualizado correctamente", cliente });
  } catch (error) {
    return res.status(500).json({ code: error.code, message: error.message });
  }
};

export const eliminarCliente = async (req, res) => {
  try {
    const cliente = await Clientes.findOneAndDelete({ _id: req.params.id });

    if (!cliente) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    return res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
