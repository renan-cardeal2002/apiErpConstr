import { Router } from "express";
import AplicacaoController from "./controllers/AplicacaoController";
import EmpresaController from "./controllers/EmpresaController";
import EquipeController from "./controllers/EquipeController";
import MySqlController from "./controllers/MySqlController";
import PessoaController from "./controllers/PessoaController";
import ProdutoController from "./controllers/ProdutoController";
import TiposPagamentoController from "./controllers/TiposPagamentoController";
import UsuarioAplicacaoController from "./controllers/UsuarioAplicacaoController";
import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

routes.get("/cog/login", UsuarioController.login);

routes.post("/cog/buscarScript", MySqlController.buscarScript);

routes.get("/cog/buscarUsuarios", UsuarioController.buscarUsuarios);
routes.post("/cog/salvarUsuario", UsuarioController.salvarUsuario);
routes.delete("/cog/excluirUsuario", UsuarioController.excluirUsuario);

routes.get("/cog/buscarEmpresasUsuario", UsuarioController.buscarEmpresasUsuario);
routes.post("/cog/salvarEmpresaUsuario", UsuarioController.salvarEmpresaUsuario);
routes.delete("/cog/excluirEmpresaUsuario", UsuarioController.excluirEmpresaUsuario);

routes.get("/cog/buscarAplicacoes", AplicacaoController.buscarAplicacoes);
routes.post("/cog/salvarAplicacao", AplicacaoController.salvarAplicacao);
routes.delete("/cog/excluirAplicacao", AplicacaoController.excluirAplicacao);

routes.get("/cog/buscarAplicacoesUsuario", UsuarioAplicacaoController.buscarAplicacoesUsuario);
routes.post("/cog/salvarAplicacaoUsuario", UsuarioAplicacaoController.salvarAplicacaoUsuario);
routes.delete("/cog/excluirAplicacaoUsuario", UsuarioAplicacaoController.excluirAplicacaoUsuario);

routes.get("/cog/buscarTiposPagamento", TiposPagamentoController.buscarTiposPagamento);
routes.post("/cog/salvarTiposPagamento", TiposPagamentoController.salvarTiposPagamento);
routes.delete("/cog/excluirTiposPagamento", TiposPagamentoController.excluirTiposPagamento);

routes.get("/cog/buscarEquipes", EquipeController.buscarEquipes);
routes.post("/cog/salvarEquipe", EquipeController.salvarEquipe);
routes.delete("/cog/excluirEquipe", EquipeController.excluirEquipe);

routes.get("/cog/buscarEmpresas", EmpresaController.buscarEmpresas);
routes.post("/cog/salvarEmpresa", EmpresaController.salvarEmpresa);
routes.delete("/cog/excluirEmpresa", EmpresaController.excluirEmpresa);

routes.get("/cog/buscarPessoas", PessoaController.buscarPessoas);
routes.post("/cog/salvarPessoa", PessoaController.salvarPessoa);
routes.delete("/cog/excluirPessoa", PessoaController.excluirPessoa);

routes.get("/cog/buscarProdutos", ProdutoController.buscarProdutos);
routes.post("/cog/salvarProduto", ProdutoController.salvarProduto);
routes.delete("/cog/excluirProduto", ProdutoController.excluirProduto);

export default routes;
