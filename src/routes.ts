import { Router } from "express";
import EquipeController from "./controllers/EquipeController";
import TiposPagamentoController from "./controllers/TiposPagamentoController";
import UsuarioController from "./controllers/UsuarioController";

const routes = Router();

routes.get("/cog/buscarTiposPagamento", TiposPagamentoController.buscarTiposPagamento);
routes.post("/cog/salvarTiposPagamento", TiposPagamentoController.salvarTiposPagamento);
routes.delete("/cog/excluirTiposPagamento", TiposPagamentoController.excluirTiposPagamento);

routes.get("/cog/buscarEquipes", EquipeController.buscarEquipes);
routes.get("/cog/buscarUsuarios", UsuarioController.buscarUsuarios);

export default routes;
