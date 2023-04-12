import util from "util";
export class EmpresaRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarEmpresas() {
    let s_sql = `
    select id_empresa "idEmpresa"
         , nome "nome"
         , cnpj_cpf "cnpjCpf"
         , tipo_pessoa "tipoPessoa"
         , inscricao_estadual "inscricaoEstadual"
         , inscricao_municipal "inscricaoMunicipal"
      from tbcogempresa`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async inserirEmpresa(nome: string, cnpjCpf: string, tipoPessoa: string, inscricaoEstadual: string, inscricaoMunicipal: string) {
    let s_sql = `
    insert into tbcogempresa
        (
            nome
          , cnpj_cpf
          , tipo_pessoa
          , inscricao_estadual
          , inscricao_municipal
        )`;

    s_sql += `
    values
    (
        '${nome}'
      , '${cnpjCpf}'
      , '${tipoPessoa}'
      , '${inscricaoEstadual}'
      , '${inscricaoMunicipal}'
    )`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async alterarEmpresa(idEmpresa: number, nome: string, cnpjCpf: string, tipoPessoa: string, inscricaoEstadual: string, inscricaoMunicipal: string) {
    let s_sql = `
    update tbcogempresa
       set nome = '${nome}'
         , cnpj_cpf = '${cnpjCpf}'
         , tipo_pessoa = '${tipoPessoa}'
         , inscricao_estadual = '${inscricaoEstadual}'
         , inscricao_municipal = '${inscricaoMunicipal}'
     where id_empresa = '${idEmpresa}'`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirEmpresa(idEmpresa: number) {
    let s_sql = `
    delete from tbcogempresa
     where id_empresa= ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
