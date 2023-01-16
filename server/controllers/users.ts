import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.app_user.findMany();

  res.status(200).json(users);
};

export { getUsers };
