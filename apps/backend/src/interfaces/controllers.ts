import { GroqService } from "../infrastructure/GroqService";
import { GenerateLearningSituation } from "../application/GenerateLearningSituation";
import { LearningSituationController } from "./controllers/LearningSituationController";

const groqService = new GroqService();
const generateUseCase = new GenerateLearningSituation(groqService);
export const learningSituationController = new LearningSituationController(generateUseCase);
