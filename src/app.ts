import express, { Request, Response } from "express";
import morgan from "morgan";

import { connectDatabase } from "./config/database/client";

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
    this.server.get("/health", async (req: Request, res: Response) => {
      return res.json({
        health: "healthy",
      });
    });
  }
}
