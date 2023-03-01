import { prisma } from "../utils/prisma";
import { UserService } from "./users";
interface IBoard {
  name: string;
  created?: string;
  last_modified: string;
  users?: string[];
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
    include: {
      job: true,
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
    include: {
      job: true,
    },
  });

  const formattedOwnerBoards =
    ownerBoards?.map((x) => ({
      id: x.id,
      name: x.name,
      created: x.created,
      lastModified: x.last_modified,
      tickCount: x.job?.filter((obj) => obj.type_id === 1).length | 0,
      taskCount: x.job?.filter((obj) => obj.type_id === 2).length | 0,
      projectCount: x.job?.filter((obj) => obj.type_id === 3).length | 0,
    })) || [];

  const formattedSharedBoards =
    sharedBoards?.map((x) => ({
      id: x.id,
      name: x.name,
      created: x.created,
      lastModified: x.last_modified,
      tickCount: x.job?.filter((obj) => obj.type_id === 1).length | 0,
      taskCount: x.job?.filter((obj) => obj.type_id === 2).length | 0,
      projectCount: x.job?.filter((obj) => obj.type_id === 3).length | 0,
    })) || [];

  const boards = { owner: formattedOwnerBoards, shared: formattedSharedBoards };
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
  const usersDetails = board.users.map((user) => {
    return UserService.getUserByEmail(user);
  });

  const x = await Promise.all(usersDetails);
  const validUsers = x.filter((e) => e);

  let createdBoard: IBoard;

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
        type_id: 1,
      },
    });
    for (const user of validUsers) {
      await tx.user_board_access.create({
        data: {
          user_id: Number(user.id),
          board_id: createdBoard.id,
          type_id: 2,
        },
      });
    }
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
