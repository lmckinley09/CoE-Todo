import { prisma } from "../utils/prisma";

interface IBoard {
  name: string;
  created?: string;
  last_modified: string;
}

const getAll = async (userId: number) => {
  const ownerBoards = await prisma.board.findMany({
    where: {
      user_board_access: {
        some: {
          user_id: Number(userId),
          type_id: 1,
        },
      },
    },
  });
  const sharedBoards = await prisma.board.findMany({
    where: {
      user_board_access: {
        some: {
          user_id: Number(userId),
          type_id: 2 || 3,
        },
      },
    },
  });

  const boards = { owner: ownerBoards, shared: sharedBoards };
  return boards;
};

const getSingle = async (boardId: number) => {
  return await prisma.board.findUnique({
    where: {
      id: Number(boardId),
    },
  });
};

const createOne = async (userId: number, board: IBoard) => {
  const owner = await prisma.access_type.findFirst({
    where: {
      description: "owner",
    },
    select: {
      id: true,
    },
  });

  let createdBoard;

  await prisma.$transaction(async (tx) => {
    createdBoard = await tx.board.create({
      data: {
        name: board.name,
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      },
    });
    await tx.user_board_access.create({
      data: {
        user_id: Number(userId),
        board_id: createdBoard.id,
        type_id: owner.id,
      },
    });
  });
  return createdBoard;
};

const updateOne = async (boardId: number, board: IBoard) => {
  return await prisma.board.update({
    where: {
      id: boardId,
    },
    data: { name: board.name, last_modified: new Date().toISOString() },
  });
};

const deleteOne = async (boardId: number) => {
  return await prisma.board.delete({
    where: {
      id: boardId,
    },
  });
};

const BoardService = {
  getAll,
  getSingle,
  createOne,
  updateOne,
  deleteOne,
};

export { BoardService };
