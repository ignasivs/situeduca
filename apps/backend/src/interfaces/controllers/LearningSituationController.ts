import { Request, Response } from "express";
import { GenerateLearningSituation } from "../../application/GenerateLearningSituation";
import { LearningSituation } from "../../domain/LearningSituation";

export class LearningSituationController {
  constructor(private readonly generateUseCase: GenerateLearningSituation) {}

  public async generate(req: Request, res: Response): Promise<void> {
    try {
      const input: LearningSituation = req.body;
      const result = await this.generateUseCase.execute(input);
      res.json({ result });
    } catch (error) {
      console.error("Error en LearningSituationController.generate:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
