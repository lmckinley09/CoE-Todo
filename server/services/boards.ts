import { prisma } from "../utils/prisma";
import { UserService } from "./users";
import { IJob } from "../services/jobs";
interface IBoard {
  name: string;
  created?: string;
  last_modified: string;
  users?: string[];
}

interface IBoards {
  name: string;
  created?: string;
  last_modified: string;
  users?: string[];
  job: IJob[];
}

const getAll = async (userId: number) => {
  const boards = await prisma.board.findMany({
    where: {
      user_board_access: {
        some: {
          user_id: Number(userId),
          type_id: 1 || 2 || 3,
        },
      },
    },
    include: {
      job: true,
      user_board_access: true,
    },
  });

  const formattedBoards = boards.map((x) => ({
    id: x.id,
    name: x.name,
    created: x.created,
    lastModified: x.last_modified,
    tickCount: x.job?.filter((obj) => obj.type_id === 1).length | 0,
    taskCount: x.job?.filter((obj) => obj.type_id === 2).length | 0,
    projectCount: x.job?.filter((obj) => obj.type_id === 3).length | 0,
    owned: x.user_board_access.some((y) => y.type_id === 1),
    shared: x.user_board_access.some((y) => [2, 3].includes(y.type_id)),
  }));

  return {
    owner: formattedBoards.filter((x) => x.owned),
    shared: formattedBoards.filter((x) => x.shared),
  };
};

const getSingle = async (boardId: number) => {
  return await prisma.board.findUnique({
    where: {
      id: Number(boardId),
    },
  });
};

const createOne = async (userId: number, board: IBoard) => {
  const usersDetails = board.users?.map((user) => {
    return UserService.getUserByEmail(user);
  });

  let x = [];

  if (usersDetails) {
    x = await Promise.all(usersDetails);
  }

  const validUsers = x.filter((e) => e);

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
        type_id: 1,
      },
    });
    if (validUsers) {
      for (const user of validUsers) {
        await tx.user_board_access.create({
          data: {
            user_id: Number(user.id),
            board_id: createdBoard.id,
            type_id: 2,
          },
        });
      }
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
