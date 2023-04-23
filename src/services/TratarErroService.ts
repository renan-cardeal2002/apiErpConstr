class ErroService {
  tratarErro(status) {
    switch (status) {
      case 500:
        return "Erro ao conectar ao banco de dados!";
    }
  }
}
export default new ErroService();
