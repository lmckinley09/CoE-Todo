import { when } from "jest-when";
import { JobService } from "../../services";
import { mockRequest, mockResponse } from "../../testUtil/mockRequest";
import { getJobs, createJob, updateJob, deleteJob } from "../jobs";

jest.mock("../../services/jobs");

describe("Job Controller", () => {
  describe("getAll", () => {
    it("should return 200 when a jobs is found", async () => {
      const boardId = 1;
      const req = mockRequest({ query: { boardId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(JobService.getAll)
        .calledWith(boardId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getJobs(req, res);

      expect(JobService.getAll).toHaveBeenCalledTimes(1);
      expect(JobService.getAll).toHaveBeenLastCalledWith(boardId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
    it("should return 404 when no users are found", async () => {
      const boardId = 1;
      const req = mockRequest({ query: { boardId } });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(JobService.getAll)
        .calledWith(boardId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getJobs(req, res);

      expect(JobService.getAll).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("createOne", () => {
    it("should return 200 when job is created", async () => {
      const boardId = 1;
      const typeId = 2;
      const newJob = {
        board_id: boardId,
        typeId: typeId,
        title: "title",
        description: "desc",
        status: "status",
        completion_date: "12-12-23",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ query: { boardId, typeId }, body: newJob });
      const res = mockResponse();

      const mockReturnValue = {} as any;

      when(JobService.createOne)
        .calledWith(boardId, typeId, newJob)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createJob(req, res);

      expect(JobService.createOne).toHaveBeenCalledTimes(1);
      expect(JobService.createOne).toHaveBeenLastCalledWith(
        boardId,
        typeId,
        newJob
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 400 when error occuers and job is not created", async () => {
      const boardId = 1;
      const typeId = 2;
      const newJob = {
        board_id: boardId,
        typeId: typeId,
        title: "title",
        description: "desc",
        status: "status",
        completion_date: "12-12-23",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };
      const req = mockRequest({ query: { boardId, typeId }, body: newJob });
      const res = mockResponse();

      const mockReturnValue = undefined as any;

      when(JobService.createOne)
        .calledWith(boardId, typeId, newJob)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createJob(req, res);

      expect(JobService.createOne).toHaveBeenCalledTimes(1);
      expect(JobService.createOne).toHaveBeenLastCalledWith(
        boardId,
        typeId,
        newJob
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("updateOne", () => {
    it("should return 200 when user is updated", async () => {
      const jobId = 1;
      const typeId = 2;
      const newJob = {
        typeId: typeId,
        title: "title",
        description: "desc",
        status: "status",
        completion_date: "12-12-23",
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({
        params: { jobId },
        query: { typeId },
        body: newJob,
      });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(JobService.updateOne)
        .calledWith(jobId, typeId, newJob)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateJob(req, res);

      expect(JobService.updateOne).toHaveBeenCalledTimes(1);
      expect(JobService.updateOne).toHaveBeenLastCalledWith(
        jobId,
        typeId,
        newJob
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it("should return 400 when error occuers and user is not updated", async () => {
      const jobId = 1;
      const typeId = 2;
      const newJob = {
        typeId: typeId,
        title: "title",
        description: "desc",
        status: "status",
        completion_date: "12-12-23",
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({
        params: { jobId },
        query: { typeId },
        body: newJob,
      });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(JobService.updateOne)
        .calledWith(jobId, typeId, newJob)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateJob(req, res);

      expect(JobService.updateOne).toHaveBeenCalledTimes(1);
      expect(JobService.updateOne).toHaveBeenLastCalledWith(
        jobId,
        typeId,
        newJob
      );
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteOne", () => {
    it("should return 204 when job is deleted", async () => {
      const jobId = 1;

      const req = mockRequest({ params: { jobId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(JobService.deleteOne)
        .calledWith(jobId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await deleteJob(req, res);

      expect(JobService.deleteOne).toHaveBeenCalledTimes(1);
      expect(JobService.deleteOne).toHaveBeenLastCalledWith(jobId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
