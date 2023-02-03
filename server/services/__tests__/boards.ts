import { BoardService } from "../boards";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";

jest.mock("@prisma/client");

describe("Boards Service", () => {
  describe("getAll", () => {
    it("Should return all boards for a user", async () => {
      const userId = 1;
      const boards = [{ id: 1 }];
      prismaAsAny.board = { findMany: jest.fn().mockReturnValueOnce(boards) };

      const result = await BoardService.getAll(userId);

      expect(prisma.board.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.board.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            user_board_access: {
              some: {
                user_id: userId,
              },
            },
          },
        })
      );
      expect(result).toEqual(boards);
    });
  });

  describe("getSingle", () => {
    it("Should return 1 board when id matches", async () => {
      const boardId = 1;
      const board = [{ id: 1 }];
      prismaAsAny.board = {
        findUnique: jest.fn().mockReturnValueOnce(board),
      };

      const result = await BoardService.getSingle(boardId);

      expect(prisma.board.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.board.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: boardId,
          },
        })
      );
      expect(result).toEqual(board);
    });
  });

  describe("createOne", () => {
    it("return board when created", async () => {
      const userId = 1;
      const name = "board";
      const newBoard = {
        name,
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      prismaAsAny.access_type = {
        findFirst: jest.fn().mockReturnValueOnce(1),
      };

      prismaAsAny.$transaction = jest
        .fn()
        .mockImplementationOnce(
          (x) => new Promise((resolve) => resolve(x(prismaAsAny)))
        );

      prismaAsAny.board = {
        create: jest.fn().mockImplementation(() => {
          return newBoard;
        }),
      };

      prismaAsAny.user_board_access = {
        create: jest.fn().mockImplementation(() => {}),
      };

      const board = await BoardService.createOne(userId, newBoard);

      expect(board).toEqual(newBoard);
      expect(prismaAsAny.board.create).toHaveBeenCalledTimes(1);
      expect(prismaAsAny.board.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            name,
          }),
        })
      );
    });
  });

  describe("updateOne", () => {
    it("return board when updated", async () => {
      const boardId = 1;
      const name = "board";
      const newBoard = {
        name,
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      prismaAsAny.board = {
        update: jest.fn().mockReturnValueOnce(newBoard),
      };

      await BoardService.updateOne(boardId, newBoard);

      expect(prisma.board.update).toHaveBeenCalledTimes(1);
      expect(prisma.board.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: boardId,
          },
        })
      );
    });
  });

  describe("deleteOne", () => {
    it("should delete user where id matches", async () => {
      const boardId = 1;
      const board = {};
      prismaAsAny.board = { delete: jest.fn().mockReturnValueOnce(board) };

      const result = await BoardService.deleteOne(boardId);

      expect(prisma.board.delete).toHaveBeenCalledTimes(1);
      expect(prisma.board.delete).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: boardId,
          },
        })
      );
      expect(result).toEqual(board);
    });
  });
});
