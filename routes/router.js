const express = require("express");
const controller = require("../controllers/controller");

const router = express.Router();

router.get("/", controller.getTodoView);
router.get("/completed", controller.completedTask);
router.get("/active", controller.activeTask);
router.get("/update-task-completed/:id", controller.updateTaskCompleted);
router.get("/update-task-active/:id", controller.updateTaskActive);
router.get("/delete-task/:id", controller.deleteTask);
router.post("/create-task", controller.createTask);

module.exports = router;
