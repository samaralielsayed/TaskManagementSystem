const Task = require("../models/task.model");

class TaskService {
  // Retrieves all tasks for a specific user.
  static async getAllTasksToUser(userId) {
    return Task.getAllTasksToUser(userId);
  }
  // Retrieves a task by its ID for a specific user.
  static async getTaskByUserId(id, userId) {
    return Task.getTaskByUserId(id, userId);
  }
  // Retrieves tasks with a specific status for a specific user.
  static async getTasksWithStatusToUser(status, userId) {
    return Task.getTasksWithStatusToUser(status, userId);
  }
  // Creates a new task for a specific user.
  static async createTask(taskData, userId) {
    return Task.create(taskData, userId);
  }
  // Updates a task by its ID for a specific user.
  static async updateTask(id, taskData, userId) {
    return Task.update(id, taskData, userId);
  }
  // Deletes a task by its ID for a specific user.
  static async deleteTask(id, userId) {
    return Task.delete(id, userId);
  }
}

module.exports = TaskService;
