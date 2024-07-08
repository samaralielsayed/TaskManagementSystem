const NotFoundError = require("../handleErrors/notFoundError");
const TaskService = require("../services/task.service");

exports.findAllTasksToUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const result = await TaskService.getAllTasksToUser(userId);
    if (result.recordset.length === 0) {
      throw new NotFoundError("Task not found");
    }
    res.json({ status: "success", data: result.recordset });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.findTaskByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const result = await TaskService.getTaskByUserId(req.params.id, userId);
    if (result.recordset.length === 0) {
      throw new NotFoundError("Task not found");
    }
    res.json({ status: "success", data: result.recordset[0] });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.findTasksWithStatusToUser = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const result = await TaskService.getTasksWithStatusToUser(
      req.query.status,
      userId
    );
    if (result.recordset.length === 0) {
      throw new NotFoundError("Task not found");
    }
    res.json({ status: "success", data: result.recordset });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    await TaskService.createTask(req.body, userId);
    res
      .status(201)
      .json({ status: "success", message: "Task created successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const task = req.body;
    const result = await TaskService.getTaskByUserId(req.params.id, userId);
    if (result.recordset.length === 0) {
      throw new NotFoundError("Task not found");
    }
    await TaskService.updateTask(req.params.id, task, userId);
    const UpdatedTask = await TaskService.getTaskByUserId(
      req.params.id,
      userId
    );
    res.status(200).json({
      status: "success",
      message: "Task updated successfully",
      data: UpdatedTask.recordset[0],
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming user ID is stored in req.user
    const result = await TaskService.getTaskByUserId(req.params.id, userId);
    if (result.recordset.length === 0) {
      throw new NotFoundError("Task not found");
    }
    await TaskService.deleteTask(req.params.id, userId);
    res
      .status(200)
      .json({ status: "success", message: "Task deleted successfully" });
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};
