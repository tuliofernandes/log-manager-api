import express, { Request, Response } from "express";
import morgan from "morgan";

import { connectDatabase } from "./config/database/client";
import { Log } from "./models/Log";

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(morgan("dev"));
  }

  private async database() {
    try {
      await connectDatabase();
    } catch (error) {
      console.log({ error });
    }
  }

  private routes() {
    this.server.get("/", async (req: Request, res: Response) => {
      console.log("GET /");
      const created = new Log({
        ip: "192.168.0.11",
        date: new Date(),
        time: new Date(),
        type: "valid_type",
        version: "1.0.0",
        description: "blabla",
      });

      await created.save();
      console.log({ created });
      return res.json({ created });
    });
  }
}
