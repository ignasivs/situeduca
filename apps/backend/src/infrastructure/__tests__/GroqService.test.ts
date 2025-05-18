import { GroqService } from "../GroqService";
import Groq from "groq-sdk";

jest.mock("groq-sdk");

describe("GroqService", () => {
  const mockCreate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // @ts-ignore - mock implementation
    Groq.mockImplementation(() => ({
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    }));
  });

  it("should return a generated message from Groq", async () => {
    // Arrange
    const prompt = "Genera una situación de aprendizaje sobre energías renovables.";
    const mockResponse = {
      choices: [
        {
          message: {
            content: "Situación de aprendizaje sobre energías renovables...",
          },
        },
      ],
    };

    mockCreate.mockResolvedValue(mockResponse);

    const service = new GroqService();

    // Act
    const result = await service.generateLearningSituation(prompt);

    // Assert
    expect(result).toBe("Situación de aprendizaje sobre energías renovables...");
    expect(mockCreate).toHaveBeenCalledWith({
      model: "compound-beta",
      messages: [
        { role: "system", content: "Eres un asistente educativo experto." },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });
  });

  it("should throw an error if message is missing", async () => {
    mockCreate.mockResolvedValue({ choices: [{ message: { content: null } }] });

    const service = new GroqService();

    await expect(service.generateLearningSituation("algo")).rejects.toThrow("La respuesta del modelo fue vacía.");
  });
});
