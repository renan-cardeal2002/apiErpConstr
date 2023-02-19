import { Router } from "express";
import TiposPagamentoController from "./controllers/TiposPagamentoController";

const routes = Router();

routes.get("/cog/buscarTiposPagamento", TiposPagamentoController.buscarTiposPagamento);

export default routes;
