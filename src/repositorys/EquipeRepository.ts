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
  async inserirEquipe(nome: string) {
    let s_sql = `
    insert into tbcogequipe
      (nome_equipe)
    values
      ('${nome}')`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async alterarEquipe(idEquipe: number, nome: string) {
    let s_sql = `
    update tbcogequipe
       set nome_equipe = '${nome}'
     where id_equipe = '${idEquipe}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async excluirEquipe(idEquipe: number) {
    let s_sql = `
    delete from tbcogequipe
     where id_equipe = '${idEquipe}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
