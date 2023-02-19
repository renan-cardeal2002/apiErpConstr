export class TiposPagamentoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarTiposPagamento() {
    let s_sql = `select * from tbcogtipopagamento`;
    let retorno;

    await this.conn.query(s_sql, (err, rows) => {
      if (err) throw err;
      console.log(rows);
      retorno = rows;
    });

    return retorno;
  }
}
