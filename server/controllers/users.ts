import { Request, Response } from "express";
import { UserService } from "./../services";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await UserService.getAll();
  return !users ? res.sendStatus(404) : res.status(200).json(users);
};

const getUserById = async (req: Request, res: Response) => {
  // const { userId } = req.headers;
  const { userId } = req.params;

  const user = await UserService.getSingle(Number(userId));
  return !user ? res.sendStatus(404) : res.status(200).json(user);
};

const createUser = async (req: Request, res: Response) => {
  const createdUser = await UserService.createOne(req.body);
  return !createdUser ? res.sendStatus(400) : res.status(200).json(createdUser);
};

const updateUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const updatedUser = await UserService.updateOne(Number(userId), req.body);
  return !updatedUser ? res.sendStatus(404) : res.sendStatus(200);
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  await UserService.deleteOne(Number(userId));
  res.sendStatus(204);
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };
