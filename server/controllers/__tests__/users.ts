import {
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  createUser,
  deleteUser,
} from "../users";
import { when } from "jest-when";
import { UserService } from "../../services/users";
import { Request, Response } from "express";
import { mockRequest, mockResponse } from "../../testUtil/mockRequest";

jest.mock("../../services/users");

describe("User Controller", () => {
  describe("getAll", () => {
    it("should return 200 when users are found", async () => {
      const req = mockRequest();
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.getAll)
        .calledWith()
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getAllUsers(req, res);

      expect(UserService.getAll).toHaveBeenCalledTimes(1);
      expect(UserService.getAll).toHaveBeenLastCalledWith();
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
    it("should return 404 when no users are found", async () => {
      const req = mockRequest();
      const res = {} as Response;
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

  describe("getSingle", () => {
    it("should return 200 when 1 user is found", async () => {
      const userId = 1;

      const req = mockRequest({ params: { userId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.getSingle)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getUserById(req, res);

      expect(UserService.getSingle).toHaveBeenCalledTimes(1);
      expect(UserService.getSingle).toHaveBeenLastCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 404 when no user is found", async () => {
      const userId = 1;

      const req = mockRequest({ params: { userId } });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(UserService.getSingle)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getUserById(req, res);

      expect(UserService.getSingle).toHaveBeenCalledTimes(1);
      expect(UserService.getSingle).toHaveBeenLastCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("getUserByEmail", () => {
    it("should return 200 when email matches param", async () => {
      const email = "email@email.com";

      const req = mockRequest({ params: { email } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.getUserByEmail)
        .calledWith(email)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getUserByEmail(req, res);

      expect(UserService.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(UserService.getUserByEmail).toHaveBeenLastCalledWith(email);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 404 when no user matches email", async () => {
      const email = "email@email.com";

      const req = mockRequest({ params: { email } });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(UserService.getUserByEmail)
        .calledWith(email)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await getUserByEmail(req, res);

      expect(UserService.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(UserService.getUserByEmail).toHaveBeenLastCalledWith(email);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("createOne", () => {
    it("should return 200 when user created", async () => {
      const newUser = {
        email: "email@email.com",
        first_name: "fname",
        last_name: "lname",
        password: "password1!",
        role_id: 2,
        profile_picture: "picture.png",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ body: newUser });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.createOne)
        .calledWith(newUser)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createUser(req, res);

      expect(UserService.createOne).toHaveBeenCalledTimes(1);
      expect(UserService.createOne).toHaveBeenLastCalledWith(newUser);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });

    it("should return 400 when error occuers and user is not created", async () => {
      const newUser = {
        email: "email@email.com",
        first_name: "fname",
        last_name: "lname",
        password: "password1!",
        role_id: 2,
        profile_picture: "picture.png",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ body: newUser });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(UserService.createOne)
        .calledWith(newUser)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await createUser(req, res);

      expect(UserService.createOne).toHaveBeenCalledTimes(1);
      expect(UserService.createOne).toHaveBeenLastCalledWith(newUser);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(400);
    });
  });

  describe("updateOne", () => {
    it("should return 200 when user is updated", async () => {
      const userId = 1;
      const newUser = {
        email: "email@email.com",
        first_name: "fname",
        last_name: "lname",
        password: "password1!",
        role_id: 2,
        profile_picture: "picture.png",
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ params: { userId }, body: newUser });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.updateOne)
        .calledWith(userId, newUser)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateUser(req, res);

      expect(UserService.updateOne).toHaveBeenCalledTimes(1);
      expect(UserService.updateOne).toHaveBeenLastCalledWith(userId, newUser);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(200);
    });

    it("should return 400 when error occuers and user is not updated", async () => {
      const userId = 1;
      const newUser = {
        email: "email@email.com",
        first_name: "fname",
        last_name: "lname",
        password: "password1!",
        role_id: 2,
        profile_picture: "picture.png",
        last_modified: new Date().toISOString(),
      };

      const req = mockRequest({ params: { userId }, body: newUser });
      const res = mockResponse();
      const mockReturnValue = undefined as any;

      when(UserService.updateOne)
        .calledWith(userId, newUser)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await updateUser(req, res);

      expect(UserService.updateOne).toHaveBeenCalledTimes(1);
      expect(UserService.updateOne).toHaveBeenLastCalledWith(userId, newUser);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
  });

  describe("deleteOne", () => {
    it("should return 204 when user is deleted", async () => {
      const userId = 1;

      const req = mockRequest({ params: { userId } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(UserService.deleteOne)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await deleteUser(req, res);

      expect(UserService.deleteOne).toHaveBeenCalledTimes(1);
      expect(UserService.deleteOne).toHaveBeenLastCalledWith(userId);
      expect(res.sendStatus).toHaveBeenCalledTimes(1);
      expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
  });
});
