export class EquipeRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarEquipes() {
    let s_sql = `select id_equipe "idEquipe", nome_equipe "nome"  from tbcogequipe`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
