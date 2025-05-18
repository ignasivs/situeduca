export interface IAIService {
    generateLearningSituation(prompt: string): Promise<string>;
  }
  