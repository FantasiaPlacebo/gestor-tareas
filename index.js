// importados
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;
// 4. Conectar a la Base de Datos (MongoDB)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");

    // 5. Encender el servidor (SOLO SI LA BD SE CONECTA)
    // Movemos el app.listen aquí adentro
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });

// 6. Crear nuestra primera ruta (la página de inicio)
app.get("/", (request, response) => {
  // ...envíale esta respuesta."
  response.send("¡Hola, mundo! Este es mi servidor.");
});
