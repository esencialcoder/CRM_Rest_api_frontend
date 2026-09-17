import Productos from "../models/Productos.js";

import multer from "multer";
import shortid from "shortid";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configuracionMulter = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      // Desde controllers sube a la raíz y entra en uploads.
      cb(null, path.join(__dirname, "../uploads"));
    },

    filename: (req, file, cb) => {
      const extension = file.mimetype.split("/")[1];

      cb(null, `${shortid.generate()}.${extension}`);
    },
  }),

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      cb(null, true);
    } else {
      cb(new Error("Formato no válido"), false);
    }
  },
};

const upload = multer(configuracionMulter).single("imagen");

export const subirArchivo = (req, res, next) => {
  upload(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
    next();
  });
};

export const nuevoProducto = async (req, res) => {
  try {
    const producto = new Productos(req.body);
    if (req.file) {
      producto.imagen = req.file.filename;
    }
    await producto.save();
    return res
      .status(201)
      .json({ message: "Producto creado correctamente", producto });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const mostrarProductos = async (req, res) => {
  try {
    const productos = await Productos.find({});
    return res.json(productos);
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

// muestra un producto por ID
export const mostrarProducto = async (req, res) => {
  try {
    const producto = await Productos.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json(producto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const actualizarProducto = async (req, res) => {
  try {
    const datosProducto = {
      ...req.body,
    };

    // Si se envía una imagen nueva, reemplaza la anterior.
    if (req.file) {
      datosProducto.imagen = req.file.filename;
    }

    const producto = await Productos.findByIdAndUpdate(
      req.params.id,
      datosProducto,
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!producto) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto actualizado correctamente",
      producto,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const eliminarProducto = async (req, res) => {
  try {
    const producto = await Productos.findOneAndDelete({ _id: req.params.id });
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
