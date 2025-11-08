const Task = require("../models/Task");
const Project = require("../models/Project");

exports.crearTarea = async (req, res) => {
  try {
    const { nombre, descripcion, proyecto } = req.body;
    const proyectoExiste = await Project.findById(proyecto);
    if (!proyectoExiste) {
      return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    }
    if (proyectoExiste.creador.toString() !== req.usuario.id) {
      return res
        .status(401)
        .json({ mensaje: "No autorizado para añadir tareas a este proyecto" });
    }
    const tarea = new Task({
      nombre,
      descripcion,
      proyecto,
    });
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor al crear la tarea" });
  }
};

exports.obtenerTareas = async (req, res) => {
  try {
    const { idProyecto } = req.params;
    const proyecto = await Project.findById(idProyecto);
    if (!proyecto) {
      return res.status(404).json({ mensaje: "Proyecto no encontrado" });
    }
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }
    const tareas = await Task.find({ proyecto: idProyecto });
    res.json(tareas);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error en el servidor al obtener las tareas" });
  }
};

exports.actualizarTarea = async (req, res) => {
  try {
    const { idTarea } = req.params;
    let tarea = await Task.findById(idTarea);
    if (!tarea) {
      return res.status(404).json({ mensaje: "Tarea no encontrada" });
    }
    const proyecto = await Project.findById(tarea.proyecto);
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json({ mensaje: "No autorizado" });
    }
    const { nombre, descripcion, estado, fechaEntrega, prioridad } = req.body;
    tarea.nombre = nombre || tarea.nombre;
    tarea.descripcion = descripcion || tarea.descripcion;
    tarea.estado = estado || tarea.estado;
    tarea.fechaEntrega = fechaEntrega || tarea.fechaEntrega;
    tarea.prioridad = prioridad || tarea.prioridad;
    const tareaActualizada = await tarea.save();
    res.json(tareaActualizada);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error en el servidor al actualizar la tarea" });
  }
};
