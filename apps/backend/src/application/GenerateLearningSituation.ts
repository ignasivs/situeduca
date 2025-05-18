import { LearningSituation } from "../domain/LearningSituation";
import { IAIService } from "../domain/services/IAIService";

export class GenerateLearningSituation {
    constructor(private readonly aiService: IAIService) {}

  async execute(input: LearningSituation): Promise<string> {
    const prompt = this.buildPrompt(input);
    return await this.aiService.generateLearningSituation(prompt);
  }

  private buildPrompt(input: LearningSituation): string {
    return `Genera una situación de aprendizaje para un curso de ${input.course}, con niños de edad ${input.ageRange}, sobre el tema "${input.topic}". La extensión debe ser aproximadamente ${input.length} palabras. Considera: ${input.additionalNotes || "No hay notas adicionales."}`;
  }
}
