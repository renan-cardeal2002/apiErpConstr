export class TiposPagamentoRepository {
  async buscarTiposPagamento() {
    let s_sql = `
        select * from tbcogtipopagamento`;

    return s_sql;
  }
}
