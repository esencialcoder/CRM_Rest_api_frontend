import express from "express";
import {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} from "../controllers/clienteController.js";

import {
  nuevoProducto,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  subirArchivo,
  eliminarProducto,
} from "../controllers/productosController.js";

import {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
} from "../controllers/pedidoController.js";

const router = express.Router();

/* CLIENTES */
router.post("/clientes", nuevoCliente);
router.get("/clientes", mostrarClientes);
router.get("/clientes/:id", mostrarCliente); // <-- obtener cliente por ID
router.put("/clientes/:id", actualizarCliente);
router.delete("/clientes/:id", eliminarCliente);

/* PRODUCTOS */
router.post("/productos", subirArchivo, nuevoProducto);
router.get("/productos", mostrarProductos);
router.get("/productos/:id", mostrarProducto); // <-- obtener producto por ID
router.put("/productos/:id", subirArchivo, actualizarProducto);
router.delete("/productos/:id", eliminarProducto);

/* PEDIDOS */
router.post("/pedidos", nuevoPedido);
router.get("/pedidos", mostrarPedidos);
router.get("/pedidos/:id", mostrarPedido); // <-- obtener pedido por ID
router.put("/pedidos/:id", actualizarPedido);
router.delete("/pedidos/:id", eliminarPedido);

export default router;
