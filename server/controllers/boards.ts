import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBoards = async (req: Request, res: Response) => {
  //search in deifferent table?
  const { userId } = req.params;
  const boards = await prisma.board.findMany({
    where: {
      id: Number(userId),
    },
  });
  res.status(200).json(boards);
};

const getBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await prisma.board.findUnique({
    where: {
      id: Number(boardId),
    },
  });
  res.status(200).json(board);
};

const createBoard = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { name } = req.body;
  const board = { name };
  const createdBoard = await prisma.board.create({ data: board });
  res.status(201).json(createdBoard);
};

const updateBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { name, created, last_modified } = req.body;
  const board = {
    name,
    created,
    last_modified,
  };
  const updatedBoard = await prisma.board.update({
    where: {
      id: Number(boardId),
    },
    data: board,
  });
  res.status(201).json(updatedBoard);
};

const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  await prisma.board.delete({
    where: {
      id: Number(boardId),
    },
  });
  res.status(201);
};

export { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
