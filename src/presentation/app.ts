import express, { Request, Response } from "express";
import morgan from "morgan";

import { connectDatabase } from "../config/database/client";
import UploadModel from "../models/Upload";

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
      const created = new UploadModel({
        name: "Teste",
        logs: [],
      });

      await created.save();
      console.log({ created });
      return res.json({ created });
    });
  }
}
