import express from "express";
import router from "./routes/index.js";
import db from "./config/db.js";
import dotenv from 'dotenv/config'

const app = express();

// Conectar la base de datos
db.authenticate()
  .then(() => console.log("Base de datos contectada"))
  .catch((error) => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar pug
app.set("view engine", "pug");

// Definir la carpeta publica
app.use(express.static("public"));

// Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();
  res.locals.actualYear = year.getFullYear();
  res.locals.nombresitio = "Agencia de Viajes";

  next();
});

// Agregar body para leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Agregar router
app.use("/", router);

app.listen(port, () => {
  console.log(`El servido está funcionando en el puerto ${port}`);
});
