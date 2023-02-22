export class ProdutoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarProdutos() {}
  async inserirProduto() {}
  async alterarProduto() {}
  async excluirProduto(idProduto: number) {}
}
