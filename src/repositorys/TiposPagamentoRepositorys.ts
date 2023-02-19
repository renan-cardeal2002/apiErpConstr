export class TiposPagamentoRepository {
  public conn;
  constructor(conexao) {
    this.conn = conexao;
  }
  async buscarTiposPagamento() {
    let s_sql = `select id_tipo_pagamento "idTipoPagamento", tipo_pagamento "tipoPagamento"  from tbcogtipopagamento`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
