const sql = require("mssql");
const db = require("../config/db.config");

class Task {
  // Retrieves all tasks for a specific user.
  static async getAllTasksToUser(userId) {
    const request = new sql.Request();
    return request.query(`SELECT * FROM Tasks WHERE userId = ${userId}`);
  }
  // Retrieves a task by its ID for a specific user.
  static async getTaskByUserId(id, userId) {
    const request = new sql.Request();
    return request.query(
      `SELECT * FROM Tasks WHERE id = ${id} AND userId = ${userId}`
    );
  }
  // Retrieves tasks with a specific status for a specific user.
  static async getTasksWithStatusToUser(status, userId) {
    const request = new sql.Request();
    return request.query(
      `SELECT * FROM Tasks WHERE status = '${status}' AND userId = ${userId}`
    );
  }
  // Creates a new task for a specific user.
  static async create(newTask, userId) {
    const request = new sql.Request();
    return request.query(`INSERT INTO Tasks (title, description, status, userId, created_at, updated_at) 
                          VALUES ('${newTask.title}', '${newTask.description}', '${newTask.status}', '${userId}', 
                          GETDATE(), GETDATE())`);
  }
  // Updates a task by its ID for a specific user.
  static async update(id, task, userId) {
    const request = new sql.Request();
    let query = "UPDATE Tasks SET ";
    const fields = [];

    for (let key in task) {
      if (task.hasOwnProperty(key)) {
        if (task[key] !== undefined) {
          fields.push(`${key}='${task[key]}'`);
        }
      }
    }

    if (fields.length > 0) {
      query +=
        fields.join(", ") +
        `, updated_at=GETDATE() WHERE id=${id} AND userId=${userId}`;
      return request.query(query);
    } else {
      throw new Error("No fields to update");
    }
  }
  // Deletes a task by its ID for a specific user.
  static async delete(id, userId) {
    const request = new sql.Request();
    return request.query(
      `DELETE FROM Tasks WHERE id=${id} AND userId=${userId}`
    );
  }
}

module.exports = Task;
