class Conexao {
  public async connectDb() {
    var mysql = require("mysql");
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "erpconstr",
    });

    await conn.connect();
    return conn;
  }
}

export default new Conexao();
