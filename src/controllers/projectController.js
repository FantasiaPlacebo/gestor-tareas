const Project = require("../models/Project");

exports.crearProyecto = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const proyecto = new Project({
      nombre,
      descripcion,
      creador: req.usuario.id,
    });
    await proyecto.save();
    res.status(201).json(proyecto);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error en el servidor al crear el proyecto" });
  }
};

exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Project.find({ creador: req.usuario.id });
    res.json(proyectos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error en el servidor al obtener los proyectos" });
  }
};
