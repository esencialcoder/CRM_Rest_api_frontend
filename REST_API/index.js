import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./routes/index.js";

const app = express();
const port = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(
      `Servidor conectado a MongoDB en ${mongoose.connection.host}:${mongoose.connection.port}:${mongoose.connection.name}`,
    );

    app.listen(port, () => {
      console.log(`Servidor escuchando en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al conectar con MongoDB:", error);
    process.exit(1);
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

startServer();
