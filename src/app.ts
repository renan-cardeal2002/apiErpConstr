import express from "express";
import routes from "./routes";

class App {
  public express: express.Application;
  public constructor() {
    process.env.TZ = "America";
    this.express = express();

    this.middlewares();
    this.routes();
    this.createConnection();
  }

  private middlewares(): void {
    this.express.use(express.json({ limit: "10MB" }));
  }

  private async createConnection() {
    // this.conn = mysql.createConnection({
    //   host: "localhost",
    //   user: "root",
    //   password: "",
    //   database: "erpconstr",
    // });
    // this.conn.connect((err) => {
    //   if (err) {
    //     console.log("Erro connecting to database...", err);
    //     return;
    //   }
    //   console.log("Connection established!");
    // });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

export default new App().express;
