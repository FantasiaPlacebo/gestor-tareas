const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const taskController = require("../controllers/taskController");

router.post("/", authMiddleware, taskController.crearTarea);
router.put("/:idTarea", authMiddleware, taskController.actualizarTarea);

module.exports = router;
