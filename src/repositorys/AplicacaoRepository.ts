import util from "util";

export class AplicacaoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }

  async buscarAplicacoes() {
    let s_sql = `
    select id_aplicacao "idAplicacao"
         , id_sistema "idSistema"
         , nome_aplicativo "nomeAplicativo"
         , situacao "situacao"
      from tbcogaplicacao
     where situacao = 'A'`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async inserirAplicacao(idAplicacao: string, idSistema: string, nomeAplicativo: string, situacao: string) {
    let s_sql = `
    insert into tbcogaplicacao
        (
          id_aplicacao
        , id_sistema
        , nome_aplicativo
        , situacao
        )`;

    s_sql += `
    values
        (
          '${idAplicacao}'
        , '${idSistema}'
        , '${nomeAplicativo}'
        , '${situacao}'
        )`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async alterarAplicacao(idAplicacao: string, idSistema: string, nomeAplicativo: string, situacao: string) {
    let s_sql = `
    update tbcogaplicacao
       set id_sistema = '${idSistema}'
         , nome_aplicativo = '${nomeAplicativo}'
         , situacao = '${situacao}'
     where id_aplicacao = '${idAplicacao}'`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirAplicacao(idAplicacao: string) {
    let s_sql = `
    delete 
      from tbcogaplicacao
     where id_aplicacao = '${idAplicacao}'`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
