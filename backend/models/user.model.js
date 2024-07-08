const sql = require("mssql");
const db = require("../config/db.config");
const bcrypt = require("bcryptjs");
class User {
  static async getByEmail(email) {
    const request = new sql.Request();
    const result = await request.query(
      `SELECT * FROM Users WHERE email = '${email}'`
    );
    return result.recordset[0];
  }
  static async getById(id) {
    const request = new sql.Request();
    return request.query(`SELECT * FROM Users WHERE id = ${id}`);
  }
  static async create(newUser) {
    const { password, firstname, lastname, email } = newUser;
    const request = new sql.Request();
    const result =
      await request.query(`INSERT INTO Users ( password, firstname, lastname, email)
                                            VALUES ( '${password}', '${firstname}', '${lastname}', '${email}')`);
    return result.recordset;
  }
  static async update(id, user) {
    const request = new sql.Request();
    let query = "UPDATE Users SET ";
    const fields = [];

    for (let key in user) {
      if (user[key] !== undefined && key !== "password") {
        fields.push(`${key}='${user[key]}'`);
      } else if (key == "password") {
        console.log("key");
        const passwordHash = await bcrypt.hash(user[key], 10);
        fields.push(`password='${passwordHash}'`);
      }
    }

    if (fields.length > 0) {
      query += fields.join(", ") + `  WHERE id=${id}`;
      return request.query(query);
    } else {
      throw new Error("No fields to update");
    }
  }
}

module.exports = User;
