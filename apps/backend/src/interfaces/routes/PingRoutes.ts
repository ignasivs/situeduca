import { Router } from "express";
import { PingController } from "../controllers/PingController";

export function getPingRoutes(controller: PingController): Router {
  const router = Router();

  router.get("/ping", controller.generate.bind(controller));

  return router;
}
