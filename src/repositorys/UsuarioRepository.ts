export class UsuarioRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarUsuarios() {
    let s_sql = `select id_usuario "idUsuario", login "login", senha "senha"  from tbcogusuario`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async login(login: string, senha: string) {
    let s_sql = `
    select count(1) "temUser"
      from tbcogusuario
     where login = '${login}'
       and senha = '${senha}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
