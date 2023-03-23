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
     where a.id_usuario = ${idUsuario}
       and a.id_empresa = ${idEmpresa}
       and b.id_aplicacao = a.id_aplicacao
     order by b.id_sistema, a.id_aplicacao`;
    console.log(idEmpresa);

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
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

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async excluirAplicacaoUsuario(idUsuarioAplicacao: number) {
    let s_sql = `
    delete from tbcogusuario_aplicacao
     where id_usuario_aplicacao = ${idUsuarioAplicacao}`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
