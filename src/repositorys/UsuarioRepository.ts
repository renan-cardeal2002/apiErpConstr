import util from "util";
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

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async buscarUsuarios() {
    let s_sql = `select id_usuario "idUsuario", login "login", senha "senha"  from tbcogusuario`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async buscarEmpresasUsuario(idUsuario: number) {
    let s_sql = `
    select a.id_usuario_empresa "idUsuarioEmpresa"
         , a.id_usuario "idUsuario"
         , a.id_empresa "idEmpresa"
         , b.nome "nome"
      from tbcogusuario_empresa a, tbcogempresa b
     where a.id_usuario = ${idUsuario}
       and b.id_empresa = a.id_empresa`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }

  async inserirUsuario(login: string, senha: string) {
    let s_sql = `
    insert into tbcogusuario
      (
        login
      , senha
      )
    values
      (
        '${login}'
      , '${senha}'
      )`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async alterarUsuario(idUsuario: number, login: string, senha: string) {
    let s_sql = `
    update tbcogusuario
       set login = '${login}'
         , senha = '${senha}'
     where id_usuario = ${idUsuario}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirUsuario(idUsuario: number) {
    let s_sql = `
    delete from tbcogusuario
     where id_usuario = ${idUsuario}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }

  async inserirEmpresaUsuario(idUsuario: string, idEmpresa: string) {
    let s_sql = `
    insert into tbcogusuario_empresa
      (
        id_usuario
      , id_empresa
      )
    values
      (
        '${idUsuario}'
      , '${idEmpresa}'
      )`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirEmpresaUsuario(idUsuarioEmpresa: number) {
    let s_sql = `
    delete from tbcogusuario_empresa
     where id_usuario_empresa = ${idUsuarioEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
