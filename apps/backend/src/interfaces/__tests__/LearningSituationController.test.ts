import { LearningSituationController } from "../controllers/LearningSituationController";
import { Request, Response } from "express";

describe("LearningSituationController", () => {
  let controller: LearningSituationController;
  let mockGenerateUseCase: any;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    mockGenerateUseCase = {
      execute: jest.fn(),
    };
    controller = new LearningSituationController(mockGenerateUseCase);
    req = { body: { course: "Math", ageRange: "10-12", topic: "Fractions", length: 45 } };
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.spyOn(console, "error").mockImplementation(() => {}); // Para que no muestre el error en consola durante el test
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return 200 and result on success", async () => {
    mockGenerateUseCase.execute.mockResolvedValue("Generated learning situation");

    await controller.generate(req as Request, res as Response);

    expect(mockGenerateUseCase.execute).toHaveBeenCalledWith(req.body);
    expect(res.json).toHaveBeenCalledWith({ result: "Generated learning situation" });
  });

  it("should return 500 and error message on failure", async () => {
    mockGenerateUseCase.execute.mockRejectedValue(new Error("Failure"));

    await controller.generate(req as Request, res as Response);

    expect(mockGenerateUseCase.execute).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
