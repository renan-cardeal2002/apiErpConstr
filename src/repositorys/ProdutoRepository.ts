import util from "util";
export class ProdutoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarProdutos(idEmpresa: number) {
    let s_sql = `
    select id_produto "idProduto"
         , descricao "descricaoProduto"
         , situacao "situacao"
      from tbcogproduto
     where id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async inserirProduto(idEmpresa: number, descricao: string, situacao: string) {
    let s_sql = `
    insert into tbcogproduto
      (
        id_empresa
      , descricao
      , situacao
      )
    values
      (
        ${idEmpresa}
      , '${descricao}'
      , '${situacao}'
      )`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async alterarProduto(idProduto: number, idEmpresa: number, descricao: string, situacao: string) {
    let s_sql = `
    update tbcogproduto
       set descricao = '${descricao}'
         , situacao = '${situacao}'
     where id_produto = ${idProduto}
       and id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
  async excluirProduto(idProduto: number, idEmpresa: number) {
    let s_sql = `
    delete 
      from tbcogproduto
     where id_produto = ${idProduto}
       and id_empresa = ${idEmpresa}`;

    return await util.promisify(this.conn.query).call(this.conn, s_sql);
  }
}
