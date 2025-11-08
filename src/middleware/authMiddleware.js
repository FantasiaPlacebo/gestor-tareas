const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ mensaje: "No hay token, permiso no válido" });
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = payload.usuario;
    next();
  } catch (error) {
    res.status(401).json({ mensaje: "Token no es válido" });
  }
};
