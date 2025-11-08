const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const projectController = require("../controllers/projectController");
const taskController = require("../controllers/taskController");

router.post("/", authMiddleware, projectController.crearProyecto);
router.get("/", authMiddleware, projectController.obtenerProyectos);
router.get("/:idProyecto/tareas", authMiddleware, taskController.obtenerTareas);
module.exports = router;
