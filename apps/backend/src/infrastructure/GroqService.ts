import { IAIService } from "@/domain/services/IAIService";
import { Groq } from "groq-sdk"; // o la SDK o fetch que estés usando
import dotenv from "dotenv";

dotenv.config();

export class GroqService implements IAIService {
  private groq: Groq;

  constructor() {
    this.groq = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });
  }

  async generateLearningSituation(prompt: string): Promise<string> {
    const completion = await this.groq.chat.completions.create({
      model: "compound-beta",
      messages: [
        { role: "system", content: "Eres un asistente educativo experto." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const result = completion.choices[0]?.message.content;

    if (!result) {
      throw new Error("La respuesta del modelo fue vacía.");
    }

    return result;
  }
}
