const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, username, email, hashedPassword, tel_number) values (?, ?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.username,
        user.email,
        user.hashedPassword,
        user.tel_number,
      ]
    );
  }

  update(user) {
    return this.connection.query(
      `update ${this.table} set username = ?, email = ?, hashedPassword = ?, tel_number = ? where id = ?`,
      [user.username, user.email, user.hashedPassword, user.tel_number, user.id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id ,firstname, lastname, username, email, tel_number from  ${this.table}`
    );
  }

  getUserByEmail(user) {
    return this.connection.query("select * from user where email = ?", [
      user.email,
    ]);
  }
}

module.exports = ItemManager;
