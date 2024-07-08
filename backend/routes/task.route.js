const express = require("express");
const router = express.Router();
const tasks = require("../controllers/task.controller");
const validate = require("../validations/task.validation");
const { protect } = require("../middlewares/auth");

router.get("/", protect, tasks.findAllTasksToUser);
router.get("/status", protect, tasks.findTasksWithStatusToUser);
router.get("/:id", protect, tasks.findTaskByUserId);
router.post("/", protect, validate.create, tasks.create);
router.put("/:id", protect, validate.update, tasks.update);
router.delete("/:id", protect, tasks.delete);

module.exports = router;
