import { Router } from "express";
import { LearningSituationController } from "./controllers/LearningSituationController";
import { getLearningSituationRoutes } from "./routes/LearningSituationRoutes";
import { PingController } from "./controllers/PingController";
import { getPingRoutes } from "./routes/PingRoutes";

export default function createRoutes(
  controller: LearningSituationController,
  pingController: PingController
): Router {
  const router = Router();

  router.use("/", getLearningSituationRoutes(controller));
  router.use("/", getPingRoutes(pingController));

  return router;
}
