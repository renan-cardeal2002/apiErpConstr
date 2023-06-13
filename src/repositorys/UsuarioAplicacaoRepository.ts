import util from "util";
export class UsuarioAplicacaoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }

  async buscarAplicacoesUsuario(idUsuario: number, idEmpresa: number) {
    let s_sql = `
    select a.id_usuario "idUsuario"
         , a.id_usuario_aplicacao "idUsuarioAplicacao"
         , a.id_empresa "idEmpresa"
         , a.id_aplicacao "idAplicacao"
         , a.favorito "favorito"
         , b.id_sistema "idSistema"
         , b.nome_aplicativo "nomeAplicativo"
         , b.situacao "situacao"
      from tbcogusuario_aplicacao a, tbcogaplicacao b
     where a.id_usuario = ${idUsuario}`;

    if (idEmpresa)
      s_sql += `
       and a.id_empresa = ${idEmpresa}`;

    s_sql += `
       and b.id_aplicacao = a.id_aplicacao
     order by b.id_sistema, a.id_aplicacao`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async inserirAplicacaoUsuario(idUsuario: number, idEmpresa: number, idAplicacao: number) {
    let s_sql = `
    insert into tbcogusuario_aplicacao
      (
        id_usuario
      , id_aplicacao
      , id_empresa
      )
    values
      (
        '${idUsuario}'
      , '${idAplicacao}'
      , '${idEmpresa}'
      )`;

    console.log(s_sql);

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirAplicacaoUsuario(idUsuarioAplicacao: number) {
    let s_sql = `
    delete from tbcogusuario_aplicacao
     where id_usuario_aplicacao = ${idUsuarioAplicacao}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
