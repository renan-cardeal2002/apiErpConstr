export class UsuarioRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async login(login: string, senha: string) {
    let s_sql = `
    select count(1) "temUser", id_usuario "idUsuario", login "login"
      from tbcogusuario
     where login = '${login}'
       and senha = '${senha}'
     group by id_usuario, login`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async buscarUsuarios() {
    let s_sql = `select id_usuario "idUsuario", login "login", senha "senha"  from tbcogusuario`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async buscarEmpresasUsuario(idUsuario: number) {
    let s_sql = `
    select a.id_usuario "idUsuario", a.id_empresa "idEmpresa", b.nome "nome"
      from tbcogusuario_empresa a, tbcogempresa b
     where a.id_usuario = ${idUsuario}
       and b.id_empresa = a.id_empresa`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
