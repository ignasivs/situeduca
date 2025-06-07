import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { GenerateLearningSituation } from "../application/GenerateLearningSituation";
import { GroqService } from "../infrastructure/GroqService";
import { LearningSituationController } from "../interfaces/controllers/LearningSituationController";
import createRoutes from "../interfaces/routes";
import { PingController } from "../interfaces/controllers/PingController";

dotenv.config();

export class ExpressServer {
  private app: Application;
  private port: number;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.app.use(cors());
    this.app.use(express.json());

    // Inyectamos GroqService en el caso de uso
    const groqService = new GroqService();
    const generateLearningSituation = new GenerateLearningSituation(groqService);

    // Inyectamos el caso de uso en el controlador
    const learningSituationController = new LearningSituationController(generateLearningSituation);
    const pingController = new PingController();

    // Pasamos el controlador a las rutas
    const routes = createRoutes(learningSituationController, pingController);

    this.app.use("/api", routes);
  }

  public getApp(): Application {
    return this.app;
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}
