import Pedidos from "../models/Pedidos.js";

export const nuevoPedido = async (req, res) => {
  try {
    const pedido = new Pedidos(req.body);
    await pedido.save();
    return res.status(201).json({ message: "Creado nuevo pedido", pedido });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const mostrarPedidos = async (req, res) => {
  try {
    const pedidos = await Pedidos.find({})
      .populate("cliente")
      .populate({ path: "pedido.producto" }); // <-- con path (lo defino como objeto + "path" por si quiero añadir más opciones)
    return res.json(pedidos);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// muestra un pedido por ID
export const mostrarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findById(req.params.id)
      .populate("cliente")
      .populate("pedido.producto"); // <-- sin path (no lo defino como objeto, tampoco añado "path" porque no voy a añadir maś opciones)
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no existe" });
    }
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    })
      .populate("cliente")
      .populate("pedido.producto");

    if (!pedido) {
      return res.status(404).json({ message: "Pedido no existe" });
    }
    return res.json(pedido);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const eliminarPedido = async (req, res) => {
  try {
    const pedido = await Pedidos.findOneAndDelete({ _id: req.params.id });

    if (!pedido) {
      return res.status(404).json({ message: "No existe el pedido" });
    }
    return res.json({ message: "Pedido eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
