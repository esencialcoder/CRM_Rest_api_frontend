import mongoose from "mongoose";

const { Schema } = mongoose;

const clientesSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
  },
  apellido: {
    type: String,
    trim: true,
  },
  empresa: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
});

export default mongoose.model("Cliente", clientesSchema);
