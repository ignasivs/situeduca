import { PingController } from "../controllers/PingController";
import { Request, Response } from "express";

describe("PingController", () => {
  let controller: PingController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    controller = new PingController();
    req = { body: {} };
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
    await controller.generate(req as Request, res as Response);

    expect(res.json).toHaveBeenCalledWith({ result: "pong" });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should handle errors correctly", async () => {
    // Simular un error en el proceso
    jest.spyOn(res, 'status').mockImplementationOnce(() => {
      throw new Error('Test error');
    });

    await controller.generate(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Internal Server Error" });
  });
});
