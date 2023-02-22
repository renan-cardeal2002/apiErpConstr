export class PessoaRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarPessoas() {
    let s_sql = `
    select id_pessoa "idPessoa"
         , id_empresa "idEmpresa"
         , nome "nome"
         , cnpj_cpf "cnpjCpf"
         , tipo_pessoa "tipoPessoa"
         , situacao "situacao"
         , funcionario "funcionario"
         , cliente "cliente"
         , fornecedor "fornecedor"
         , tipo_funcionario "tipoFuncionario"
         , id_equipe "idEquipe"
      from tbcogpessoa`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async inserirPessoa(idEmpresa: number, nome: string, cnpjCpf: string, tipoPessoa: string, situacao: string, funcionario: string, cliente: string, fornecedor: string, tipoFuncionario: string, idEquipe: string) {
    let s_sql = `
    insert into tbcogpessoa
        (
          id_empresa
        , nome
        , cnpj_cpf
        , tipo_pessoa
        , situacao
        /*, funcionario
        , cliente
        , fornecedor
        , tipo_funcionario
        , id_equipe*/
        )
    values
        (
          ${idEmpresa}
        , '${nome}'
        , '${cnpjCpf}'
        , '${tipoPessoa}'
        , '${situacao}'
        /*, '${funcionario}
        , '${cliente}'
        , '${fornecedor}'
        , '${tipoFuncionario}'
        , ${idEquipe}*/
        )`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async alterarPessoa(idPessoa: number, idEmpresa: number, nome: string, cnpjCpf: string, tipoPessoa: string, situacao: string, funcionario: string, cliente: string, fornecedor: string, tipoFuncionario: string, idEquipe: string) {
    let s_sql = `
    update tbcogpessoa
       set id_empresa = ${idEmpresa}
         , nome = '${nome}'
         , cnpj_cpf = '${cnpjCpf}'
         , tipo_pessoa = '${tipoPessoa}'
         , situacao = '${situacao}'
         , funcionario = '${funcionario}'
         , cliente = '${cliente}'
         , fornecedor = '${fornecedor}'
         , tipo_funcionario = '${tipoFuncionario}'
         , id_equipe = ${idEquipe}
     where id_pessoa = '${idPessoa}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async excluirPessoa(idPessoa: number) {
    let s_sql = `
    delete from tbcogpessoa
     where id_pessoa= ${idPessoa}`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
