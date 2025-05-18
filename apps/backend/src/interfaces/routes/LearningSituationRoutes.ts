// src/interfaces/routes/learningSituationRoutes.ts
import { Router } from "express";
import { LearningSituationController } from "../controllers/LearningSituationController";

export function getLearningSituationRoutes(controller: LearningSituationController): Router {
  const router = Router();

  router.post("/learning-situation", controller.generate.bind(controller));

  return router;
}
