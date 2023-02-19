var mysql = require("mysql");
class Conexao {
  public async connectDb() {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "erpconstr",
    });

    return await conn;
  }
}

export default new Conexao();
