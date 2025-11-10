require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const app = express();
const PORT = 3000;
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use("/api/usuarios", userRoutes);
app.use("/api/proyectos", projectRoutes);
app.use("/api/tareas", taskRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado a MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
  });
app.get("/", (request, response) => {
  response.send("¡Hola, mundo! Este es mi servidor.");
});
