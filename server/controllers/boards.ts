import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getBoards = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const boards = await prisma.board.findMany({
    where: {
      user_board_access: {
        some: {
          user_id: Number(userId),
        },
      },
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
    include: {
      job: true,
    },
  });

  //can i get what table they came from?
  //eg tick and add a field to say where
  res.status(200).json(board);
};

const createBoard = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const { name } = req.body;
  const board = {
    name,
    created: new Date().toISOString(),
    last_modified: new Date().toISOString(),
  };

  const owner = await prisma.access_type.findFirst({
    where: {
      description: "owner",
    },
    select: {
      id: true,
    },
  });

  const createdBoard = await prisma.board.create({ data: board });
  await prisma.user_board_access.create({
    data: {
      user_id: Number(userId),
      board_id: createdBoard.id,
      type_id: owner.id,
    },
  });
  res.status(201).json(createdBoard);
};

const updateBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { name } = req.body;
  const board = {
    name,
    last_modified: new Date().toISOString(),
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

  res.sendStatus(204);
};

export { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
