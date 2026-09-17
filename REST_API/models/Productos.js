import mongoose from "mongoose";

const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  precio: {
    type: Number,
  },
  imagen: {
    type: String,
  },
});

export default mongoose.model("Producto", productoSchema);
