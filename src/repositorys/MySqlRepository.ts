export class MySqlRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }

  async buscarScript(s_sql: string) {
    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
