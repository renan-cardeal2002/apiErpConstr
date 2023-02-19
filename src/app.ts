import express from "express";
import cors from "cors";
import routes from "./routes";
var mysql = require("mysql");
class App {
  public express: express.Application;
  public conn: any;
  public constructor() {
    process.env.TZ = "America";
    this.express = express();

    this.middlewares();
    this.routes();
    this.createConnection();
  }

  private middlewares(): void {
    this.express.use(express.json({ limit: "10MB" }));
    this.express.use(cors());
  }

  private async createConnection() {
    this.conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database: "erpconstr",
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
