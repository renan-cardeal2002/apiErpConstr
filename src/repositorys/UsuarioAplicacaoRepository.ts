export class UsuarioAplicacaoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }

  async buscarAplicacoesUsuario(idUsuario: number) {
    let s_sql = `
    select a.id_aplicacao "idAplicacao"
         , b.id_sistema "idSistema"
         , b.nome_aplicativo "nomeAplicativo"
         , b.situacao "situacao"
         , b.favorito "favorito"
      from tbcogusuario_aplicacao a, tbcogaplicacao b
     where a.id_usuario = ${idUsuario}
       and b.id_aplicacao = a.id_aplicacao
     order by b.id_sistema, a.id_aplicacao`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async inserirAplicacaoUsuario(idUsuario: string, idAplicacao: string) {
    let s_sql = `
    insert into tbcogusuario_aplicacao
      (
        id_usuario
      , id_aplicacao
      )
    values
      (
        '${idUsuario}'
      , '${idAplicacao}'
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
