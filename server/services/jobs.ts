import { prisma } from "../utils/prisma";
interface IJob {
  boardId?: number;
  typeId: number;
  title: string;
  description?: string;
  status: string;
  completionDate?: string;
  created?: string;
  last_modified: string;
}

const getAll = async (boardId: number) => {
  const allJobs = await prisma.job.findMany({
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
  const formattedJobs =
    allJobs?.map((x) => ({
      id: x.id,
      title: x.title,
      description: x.description,
      status: x.status,
      completionDate: x.completion_date,
      lastModified: x.last_modified,
      created: x.created,
      jobType: {
        id: x.job_type.id,
        description: x.job_type.type_description,
      },
    })) || [];
  return formattedJobs;
};

const createOne = async (boardId: number, typeId: number, job: IJob) => {
  const newJob = await prisma.job.create({
    data: {
      board_id: boardId,
      type_id: typeId,
      title: job.title,
      description: job.description,
      status: job.status,
      completion_date: job.completionDate,
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    },
    select: {
      id: true,
      board_id: true,
      type_id: true,
      title: true,
      description: true,
      status: true,
      job_type: true,
      created: true,
      last_modified: true,
      completion_date: true,
    },
  });
  const formattedJob = {
    id: newJob.id,
    title: newJob.title,
    description: newJob.description,
    status: newJob.status,
    completionDate: newJob.completion_date,
    lastModified: newJob.last_modified,
    created: newJob.created,
    jobType: {
      id: newJob.job_type.id,
      description: newJob.job_type.type_description,
    },
  };
  return formattedJob;
};

const updateOne = async (jobId: number, job: IJob) => {
  return await prisma.job.update({
    where: {
      id: jobId,
    },
    data: {
      type_id: job.typeId,
      title: job.title,
      description: job.description,
      status: job.status,
      completion_date: job.completionDate,
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
