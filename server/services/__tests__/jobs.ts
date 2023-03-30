import { JobService } from "../jobs";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("Jobs Service", () => {
  describe("getAll", () => {
    it("Should return all jobs", async () => {
      const boardId = 1;
      const date = new Date().toISOString();
      const jobs = [
        {
          id: 1,
          title: "title",
          description: "desc",
          status: "status",
          completion_date: "12-12-23",
          created: date,
          last_modified: date,
          job_type: { id: 2, type_description: "task" },
        },
      ];
      const formattedJobs = [
        {
          id: 1,
          title: "title",
          description: "desc",
          status: "status",
          completionDate: "12-12-23",
          created: date,
          lastModified: date,
          jobType: { id: 2, description: "task" },
        },
      ];
      prismaAsAny.job = { findMany: jest.fn().mockReturnValueOnce(jobs) };

      const result = await JobService.getAll(boardId);

      expect(prisma.job.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.job.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
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
        })
      );
      expect(result).toEqual(formattedJobs);
    });
  });

  describe("createOne", () => {
    it("should return job when created", async () => {
      const boardId = 1;
      const typeId = 2;
      const date = new Date().toISOString();
      const newJob = {
        typeId,
        title: "title",
        description: "desc",
        status: "status",
        completion_date: "12-12-23",
        last_modified: date,
        job_type: { id: 2, type_description: "task" },
      };

      prismaAsAny.job = {
        create: jest.fn().mockReturnValueOnce(newJob),
      };

      await JobService.createOne(boardId, typeId, newJob);

      expect(prisma.job.create).toHaveBeenCalledTimes(1);
      expect(prisma.job.create).toHaveBeenCalledWith({
        data: {
          board_id: 1,
          completion_date: undefined,
          created: date,
          description: "desc",
          last_modified: date,
          status: "status",
          title: "title",
          type_id: 2,
        },
        select: {
          board_id: true,
          completion_date: true,
          created: true,
          description: true,
          id: true,
          job_type: true,
          last_modified: true,
          status: true,
          title: true,
          type_id: true,
        },
      });
    });
  });
});

describe("updateOne", () => {
  it("should return job when updated", async () => {
    const jobId = 1;
    const typeId = 2;
    const newJob = {
      typeId,
      title: "title",
      description: "desc",
      status: "status",
      completion_date: "12-12-23",
      last_modified: new Date().toISOString(),
    };

    prismaAsAny.job = {
      update: jest.fn().mockReturnValueOnce(newJob),
    };

    await JobService.updateOne(jobId, newJob);

    expect(prisma.job.update).toHaveBeenCalledTimes(1);
    expect(prisma.job.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: jobId,
        },
      })
    );
  });
});

describe("deleteOne", () => {
  it("should delete job where id matches", async () => {
    const jobId = 1;
    const job = {};
    prismaAsAny.job = { delete: jest.fn().mockReturnValueOnce(job) };

    const result = await JobService.deleteOne(jobId);

    expect(prisma.job.delete).toHaveBeenCalledTimes(1);
    expect(prisma.job.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: jobId,
        },
      })
    );
    expect(result).toEqual(job);
  });
});
