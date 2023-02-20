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
  async inserirTiposPagamento(idTipoPagamento: string, tipoPagamento: string) {
    let s_sql = `
    insert into tbcogtipopagamento
      (
        id_tipo_pagamento
      , tipo_pagamento
      )
    values
      (
        '${idTipoPagamento}'
      , '${tipoPagamento}'
      )`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async alterarTiposPagamento(idTipoPagamento: string, tipoPagamento: string) {
    let s_sql = `
    update tbcogtipopagamento
       set tipo_pagamento = '${tipoPagamento}'
     where id_tipo_pagamento = '${idTipoPagamento}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
  async excluirTiposPagamento(idTipoPagamento: string) {
    let s_sql = `
    delete from tbcogtipopagamento
     where id_tipo_pagamento = '${idTipoPagamento}'`;

    return new Promise((resolve, reject) => {
      this.conn.query(s_sql, (err, rows) => {
        err ? reject(err) : resolve(rows);
      });
    });
  }
}
