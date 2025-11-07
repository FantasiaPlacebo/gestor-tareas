const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombre_completo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nombre_de_usuario: {
      type: String,
      required: true,
      unique: true,
    },
    contraseña: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      // 'enum' es una lista de los únicos valores permitidos
      enum: ["admin", "miembro"],
      default: "miembro", // Rol por defecto cuando un usuario se registra
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usuarioSchema);
module.exports = User;
