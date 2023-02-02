const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "project" });
  }

  insert(project) {
    return this.connection.query(
      `insert into ${this.table} (title, description, link, start_year, end_year) values (?, ?, ?, ?, ?)`,
      [
        project.title,
        project.description,
        project.link,
        project.start_year,
        project.end_year,
      ]
    );
  }

  update(project) {
    return this.connection.query(
      `update ${this.table} set title = ?, description = ?, link = ?, start_year = ?, end_year = ? where id = ?`,
      [
        project.title,
        project.description,
        project.link,
        project.start_year,
        project.end_year,
        project.id,
      ]
    );
  }
}

module.exports = ItemManager;
