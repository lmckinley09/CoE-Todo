import { when } from "jest-when";
import { BoardService } from "../../services";
import { mockRequest, mockResponse } from "../../testUtil/mockRequest";
import {
  getBoard,
  getBoards,
  createBoard,
  updateBoard,
  deleteBoard,
} from "../boards";

jest.mock("../../services/boards");

describe("Board Controller", () => {
  describe("getAll", () => {
    it("should return 200 when boards are found", async () => {
      const userId = 1;
      const req = mockRequest({ query: { userId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(BoardService.getAll)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getBoards(req, res);

      expect(BoardService.getAll).toHaveBeenCalledTimes(1);
      expect(BoardService.getAll).toHaveBeenLastCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
    it("should return 404 when no boards are found", async () => {
      const userId = 1;
      const req = mockRequest({ query: { userId } });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(BoardService.getAll)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getBoards(req, res);

      expect(BoardService.getAll).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("getSingle", () => {
    it("should return 200 when 1 board is found", async () => {
      const boardId = 1;
      const req = mockRequest({ params: { boardId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(BoardService.getSingle)
        .calledWith(boardId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getBoard(req, res);

      expect(BoardService.getSingle).toHaveBeenCalledTimes(1);
      expect(BoardService.getSingle).toHaveBeenLastCalledWith(boardId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 404 when no board is found", async () => {
      const boardId = 1;

      const req = mockRequest({ params: { boardId } });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(BoardService.getSingle)
        .calledWith(boardId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getBoard(req, res);

      expect(BoardService.getSingle).toHaveBeenCalledTimes(1);
      expect(BoardService.getSingle).toHaveBeenLastCalledWith(boardId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("createOne", () => {
    it("should return 200 when user created", async () => {
      const userId = 1;
      const newBoard = {
        name: "name",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ body: newBoard });
      const res = mockResponse();
      res.locals = {
        userId: userId,
      };
      const mockReturnValue = {} as any;

      when(BoardService.createOne)
        .calledWith(userId, newBoard)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createBoard(req, res);

      expect(BoardService.createOne).toHaveBeenCalledTimes(1);
      expect(BoardService.createOne).toHaveBeenLastCalledWith(userId, newBoard);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 400 when error occuers and user is not created", async () => {
      const userId = 1;
      const newBoard = {
        name: "name",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ body: newBoard });
      const res = mockResponse();
      res.locals = {
        userId: userId,
      };
      const mockReturnValue = undefined as any;

      when(BoardService.createOne)
        .calledWith(userId, newBoard)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createBoard(req, res);

      expect(BoardService.createOne).toHaveBeenCalledTimes(1);
      expect(BoardService.createOne).toHaveBeenLastCalledWith(userId, newBoard);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  describe("updateOne", () => {
    it("should return 200 when user is updated", async () => {
      const boardId = 1;
      const newBoard = {
        name: "name",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ params: { boardId }, body: newBoard });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(BoardService.updateOne)
        .calledWith(boardId, newBoard)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateBoard(req, res);

      expect(BoardService.updateOne).toHaveBeenCalledTimes(1);
      expect(BoardService.updateOne).toHaveBeenLastCalledWith(
        boardId,
        newBoard
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it("should return 400 when error occuers and user is not updated", async () => {
      const boardId = 1;
      const newBoard = {
        name: "name",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ params: { boardId }, body: newBoard });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(BoardService.updateOne)
        .calledWith(boardId, newBoard)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateBoard(req, res);

      expect(BoardService.updateOne).toHaveBeenCalledTimes(1);
      expect(BoardService.updateOne).toHaveBeenLastCalledWith(
        boardId,
        newBoard
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteOne", () => {
    it("should return 204 when board is deleted", async () => {
      const boardId = 1;

      const req = mockRequest({ params: { boardId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(BoardService.deleteOne)
        .calledWith(boardId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await deleteBoard(req, res);

      expect(BoardService.deleteOne).toHaveBeenCalledTimes(1);
      expect(BoardService.deleteOne).toHaveBeenLastCalledWith(boardId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
