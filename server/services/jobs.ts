import { PrismaClient } from "@prisma/client";
// import prisma from "../utils/prisma";
const prisma = new PrismaClient();

interface IJob {
  boardId: number;
  typeId: number;
  title: string;
  description?: string;
  status: string;
  completion_date?: string;
  created?: string;
  last_modified: string;
}

const getAll = async (boardId: number) => {
  return await prisma.job.findMany({
    where: {
      board: {
        id: Number(boardId),
      },
    },
    select: {
      id: true,
      title: true,
      description: true,
      status: true,
      completion_date: true,
      created: true,
      last_modified: true,
      job_type: {
        select: {
          id: true,
          type_description: true,
        },
      },
    },
  });
};

const createOne = async (boardId: number, typeId: number, job: IJob) => {
  return await prisma.job.create({
    data: {
      board_id: boardId,
      type_id: typeId,
      title: job.title,
      description: job.description,
      status: job.status,
      completion_date: job.completion_date,
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    },
  });
};

const updateOne = async (jobId: number, typeId: number, job: IJob) => {
  return await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      type_id: typeId,
      title: job.title,
      description: job.description,
      status: job.status,
      completion_date: job.completion_date,
      last_modified: new Date().toISOString(),
    },
  });
};

const deleteOne = async (jobId: number) => {
  return await prisma.job.delete({
    where: {
      id: jobId,
    },
  });
};

const JobService = {
  getAll,
  createOne,
  updateOne,
  deleteOne,
};

export { JobService };
