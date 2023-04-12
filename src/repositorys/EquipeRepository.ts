import util from "util";
export class EquipeRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarEquipes(idEmpresa: number) {
    let s_sql = `
    select id_equipe "idEquipe"
         , nome_equipe "nome"
      from tbcogequipe
     where id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async inserirEquipe(idEmpresa: number, nome: string) {
    let s_sql = `
    insert into tbcogequipe (id_empresa, nome_equipe) values (${idEmpresa}, '${nome}')`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async alterarEquipe(idEmpresa: number, idEquipe: number, nome: string) {
    let s_sql = `
    update tbcogequipe
       set nome_equipe = '${nome}'
     where id_equipe = ${idEquipe}
       and id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirEquipe(idEmpresa: number, idEquipe: number) {
    let s_sql = `
    delete from tbcogequipe
     where id_equipe = ${idEquipe}
       and id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
