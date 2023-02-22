import { Router } from "express";
import EmpresaController from "./controllers/EmpresaController";
import EquipeController from "./controllers/EquipeController";
import PessoaController from "./controllers/PessoaController";
import TiposPagamentoController from "./controllers/TiposPagamentoController";
import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

routes.get("/cog/login", UsuarioController.login);

routes.get("/cog/buscarUsuarios", UsuarioController.buscarUsuarios);
routes.get("/cog/buscarEmpresasUsuario", UsuarioController.buscarEmpresasUsuario);
routes.post("/cog/salvarUsuario", UsuarioController.salvarUsuario);
routes.delete("/cog/excluirUsuario", UsuarioController.excluirUsuario);

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

export default routes;
