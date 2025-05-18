import { GenerateLearningSituation } from "../GenerateLearningSituation";

describe("GenerateLearningSituation", () => {
  const mockInput = {
    course: "Matemáticas",
    ageRange: "10-12",
    topic: "Fracciones",
    length: 45,
    additionalNotes: "Enfocado en la comprensión visual"
  };

  it("should generate a learning situation successfully", async () => {
    const mockService = {
      generateLearningSituation: jest.fn().mockResolvedValue("Situación de aprendizaje generada"),
    };
    const expectedPrompt = `Genera una situación de aprendizaje para un curso de ${mockInput.course}, con niños de edad ${mockInput.ageRange}, sobre el tema "${mockInput.topic}". La extensión debe ser aproximadamente ${mockInput.length} palabras. Considera: ${mockInput.additionalNotes}`;

    const useCase = new GenerateLearningSituation(mockService);
    const result = await useCase.execute(mockInput);

    expect(mockService.generateLearningSituation).toHaveBeenCalledWith(expectedPrompt);
    expect(result).toBe("Situación de aprendizaje generada");
  });

  it("should throw an error when the service fails", async () => {
    const mockService = {
      generateLearningSituation: jest.fn().mockRejectedValue(new Error("Fallo en el servicio")),
    };
    const expectedPrompt = `Genera una situación de aprendizaje para un curso de ${mockInput.course}, con niños de edad ${mockInput.ageRange}, sobre el tema "${mockInput.topic}". La extensión debe ser aproximadamente ${mockInput.length} palabras. Considera: ${mockInput.additionalNotes}`;

    const useCase = new GenerateLearningSituation(mockService);

    await expect(useCase.execute(mockInput)).rejects.toThrow("Fallo en el servicio");
    expect(mockService.generateLearningSituation).toHaveBeenCalledWith(expectedPrompt);
  });

});
