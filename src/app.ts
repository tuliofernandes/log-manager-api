import express, { Request, Response } from "express";
import morgan from "morgan";
import multer, { Multer } from "multer";
import cors from "cors";

import { connectDatabase } from "./config/database/client";
import { UploadLogsController } from "./controllers/UploadLogsController";
import { QueryLogsController } from "./controllers/QueryLogsController";
import errorHandler from "./middlewares/errorHandler";

export class App {
  public server: express.Application;
  private uploader!: Multer;

  constructor() {
    this.server = express();
    this.database();
    this.upload();
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(morgan("dev"));
    this.server.use(cors());
    this.server.use(errorHandler);
  }

  private async database() {
    try {
      await connectDatabase();
    } catch (error) {
      console.log({ error });
    }
  }

  private upload() {
    this.uploader = multer();
  }

  private routes() {
    this.server.get("/health", async (req: Request, res: Response) => {
      return res.json({
        health: "healthy",
      });
    });

    this.server.get("/logs", new QueryLogsController().handle);

    this.server.post(
      "/logs",
      this.uploader.array("files", 30),
      new UploadLogsController().handle
    );
  }
}
