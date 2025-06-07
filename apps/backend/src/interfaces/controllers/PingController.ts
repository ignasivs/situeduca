import { Request, Response } from "express";

export class PingController {
  constructor() {}

  public async generate(_req: Request, res: Response): Promise<void> {
    try {
      const result = "pong";
      res.status(200).json({ result });
    } catch (error) {
      console.error("Error PingController:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
