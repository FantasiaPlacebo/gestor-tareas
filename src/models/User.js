const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    nombreCompleto: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    nombreUsuario: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "miembro"],
      default: "miembro",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", usuarioSchema);
module.exports = User;
