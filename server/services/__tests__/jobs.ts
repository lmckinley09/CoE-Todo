import { JobService } from "../jobs";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");

describe("Jobs Service", () => {
  describe("getAll", () => {
    it("Should return all jobs", async () => {
      const boardId = 1;
      const jobs = [{ id: 1 }];
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
      expect(result).toEqual(jobs);
    });
  });

  describe("createOne", () => {
    it("should return job when created", async () => {
      const boardId = 1;
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
        create: jest.fn().mockReturnValueOnce(newJob),
      };

      await JobService.createOne(boardId, typeId, newJob);

      expect(prisma.job.create).toHaveBeenCalledTimes(1);
      expect(prisma.job.create).toHaveBeenCalledWith(
        expect.objectContaining({
          select: {
            id: true,
            board_id: true,
            type_id: true,
            title: true,
            description: true,
            status: true,
            completion_date: true,
          },
        })
      );
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

    await JobService.updateOne(jobId, typeId, newJob);

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
