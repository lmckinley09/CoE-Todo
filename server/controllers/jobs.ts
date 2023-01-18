import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getJobs = async (req: Request, res: Response) => {
  const { boardId } = req.query;
  const jobs = await prisma.job.findMany({
    where: {
      board: {
        id: Number(boardId),
      },
    },
  });
  //get what table they are linked too
  res.status(200).json(jobs);
};

const createJob = async (req: Request, res: Response) => {
  const { title, description, completion_date, type, project } = req.body;
  const job = {
    title,
    description,
    completion_date,
    type,
    project,
  };
  const createdJob = await prisma.job.create({ data: job });
  res.status(201).json(createdJob);
};

const updateJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const { title, description, completion_date, type, project } = req.body;
  const job = {
    title,
    description,
    completion_date,
    type,
    project,
  };
  const updatedJob = await prisma.job.update({
    where: {
      id: Number(jobId),
    },
    data: job,
  });
  res.status(201).json(updatedJob);
};

const deleteJob = async (req: Request, res: Response) => {
  const { userId } = req.params;
  await prisma.job.delete({
    where: {
      id: Number(userId),
    },
  });
  res.sendStatus(204);
};

export { getJobs, createJob, updateJob, deleteJob };
