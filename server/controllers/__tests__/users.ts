import {
  getAllUsers,
  getUserById,
  updateUser,
  createUser,
  deleteUser,
} from "../users";
import { when } from "jest-when";
import { UserService } from "../../services/users";
import { Request, Response } from "express";
// import { mockRequest, mockResponse } from "../../test-util";

jest.mock("../../services/users");

interface mockRequestArgs {
  body?: any;
  params?: any;
  query?: any;
  headers?: any;
  token?: string;
}

const mockRequest = (args?: mockRequestArgs) => {
  const get = (name: string) => {
    if (name === "authorization") return `Bearer ${args.token}`;
    return null;
  };

  return {
    ...args,
    get,
  } as unknown as Request;
};

describe("User Controller", () => {
  describe("getAll", () => {
    it("should return 404 when no users are found", async () => {
      const req = mockRequest();

      const res = {} as Response;
      res.sendStatus = jest.fn().mockReturnValue(res);

      const mockReturnValue = undefined as any;

      when(UserService.getAll)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllUsers(req, res);

      expect(UserService.getAll).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });
});
