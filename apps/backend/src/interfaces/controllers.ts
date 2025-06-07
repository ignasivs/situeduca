import { GroqService } from "../infrastructure/GroqService";
import { GenerateLearningSituation } from "../application/GenerateLearningSituation";
import { LearningSituationController } from "./controllers/LearningSituationController";
import { PingController } from "./controllers/PingController";

const groqService = new GroqService();
const generateUseCase = new GenerateLearningSituation(groqService);
export const learningSituationController = new LearningSituationController(generateUseCase);
export const pingController = new PingController();
