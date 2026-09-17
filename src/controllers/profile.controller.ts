import { Request, Response } from "express";

export const getUser = (_req: Request, res: Response) => {
  res.json({
    name: "Apoorv Aggarwal",
    role: "Software Engineer",
    experience: "WordPress & Full Stack Learner",
    country: "India",
  });
};


