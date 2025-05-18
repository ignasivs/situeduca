import { Router } from "express";
import { LearningSituationController } from "./controllers/LearningSituationController";
import { getLearningSituationRoutes } from "./routes/LearningSituationRoutes";

export default function createRoutes(controller: LearningSituationController): Router {
  const router = Router();

  router.use("/", getLearningSituationRoutes(controller));

  return router;
}
