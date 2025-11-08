const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registrarUsuario = async (req, res) => {
  try {
    const { email, nombreUsuario, password, nombreCompleto } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const nuevoUsuario = new User({
      email,
      nombreUsuario,
      password: passwordHash,
      nombreCompleto,
    });
    await nuevoUsuario.save();
    res.status(201).json({
      mensaje: "Usuario registrado exitosamente",
      usuarioId: nuevoUsuario._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al registrar el usuario" });
  }
};

exports.loginUsuario = async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body;
    const usuario = await User.findOne({ nombreUsuario });
    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    const passwordCorrecto = await bcrypt.compare(password, usuario.password);
    if (!passwordCorrecto) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }
    const payload = {
      usuario: {
        id: usuario._id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};
