import { Request, Response } from "express";
import { BoardService } from "./../services";

const getBoards = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const boards = await BoardService.getAll(Number(userId));
  return !boards ? res.sendStatus(404) : res.status(200).json(boards);
};

const getBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const board = await BoardService.getSingle(Number(boardId));

  return !board ? res.sendStatus(404) : res.status(200).json(board);
};

const createBoard = async (req: Request, res: Response) => {
  const { userId } = req.query;
  const createdBoard = await BoardService.createOne(Number(userId), req.body);
  return !createdBoard
    ? res.sendStatus(400)
    : res.status(200).json(createdBoard);
};

const updateBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const updatedBoard = await BoardService.updateOne(Number(boardId), req.body);
  return !updatedBoard ? res.sendStatus(404) : res.sendStatus(200);
};

const deleteBoard = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  await BoardService.deleteOne(Number(boardId));
  res.sendStatus(204);
};

export { getBoards, getBoard, createBoard, updateBoard, deleteBoard };
