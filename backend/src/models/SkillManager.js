const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "skill" });
  }

  insert(skill) {
    return this.connection.query(
      `insert into ${this.table} (name, type) values (?, ?)`,
      [skill.name, skill.type]
    );
  }

  update(skill) {
    return this.connection.query(
      `update ${this.table} set name = ?, type = ? where id = ?`,
      [skill.name, skill.type, skill.id]
    );
  }
}

module.exports = ItemManager;
