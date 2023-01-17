import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.app_user.findMany();
  res.status(200).json(users);
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await prisma.app_user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
    },
  });
  res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
  const { email, first_name, last_name, password } = req.body;
  const user = {
    email,
    first_name,
    last_name,
    password,
  };
  const createdUser = await prisma.app_user.create({ data: user });
  res.status(201).json(createdUser);
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, first_name, last_name, password } = req.body;
  const user = {
    email,
    first_name,
    last_name,
    password,
  };
  const updatedUser = await prisma.app_user.update({
    where: {
      id: Number(userId),
    },
    data: user,
  });
  res.status(201).json(updatedUser);
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await prisma.app_user.delete({
    where: {
      id: Number(userId),
    },
  });
  res.status(201);
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
