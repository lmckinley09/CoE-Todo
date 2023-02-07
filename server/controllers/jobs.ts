import { Request, Response } from "express";
import { JobService } from "./../services";

const getJobs = async (req: Request, res: Response) => {
  const { boardId } = req.query;
  const jobs = await JobService.getAll(Number(boardId));

  return !jobs ? res.sendStatus(404) : res.status(200).json(jobs);
};

const createJob = async (req: Request, res: Response) => {
  const { boardId } = req.query;
  const createdJob = await JobService.createOne(
    Number(boardId),
    req.body.type_id,
    req.body
  );

  return !createdJob ? res.sendStatus(400) : res.status(200).json(createdJob);
};

const updateJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  const updatedJob = await JobService.updateOne(
    Number(jobId),
    req.body.type_id,
    req.body
  );

  return !updatedJob ? res.sendStatus(400) : res.sendStatus(200);
};

const deleteJob = async (req: Request, res: Response) => {
  const { jobId } = req.params;
  await JobService.deleteOne(Number(jobId));

  res.sendStatus(204);
};

export { getJobs, createJob, updateJob, deleteJob };
