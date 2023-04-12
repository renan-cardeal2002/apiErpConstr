import util from "util";
export class MySqlRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }

  async buscarScript(s_sql: string) {
    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
