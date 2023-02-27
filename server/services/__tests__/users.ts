import { UserService } from "../users";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";

jest.mock("@prisma/client");
jest.mock("bcryptjs");
jest.mock("../../utils/prisma");

describe("Users Service", () => {
  describe("getAll", () => {
    it("Should return all users", async () => {
      const users = [{ id: 1 }];
      prismaAsAny.app_user = { findMany: jest.fn().mockReturnValueOnce(users) };

      const result = await UserService.getAll();

      expect(prisma.app_user.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.app_user.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          select: {
            id: true,
            email: true,
            first_name: true,
            last_name: true,
          },
        })
      );
      expect(result).toEqual(users);
    });
  });

  describe("getSingle", () => {
    it("Should return 1 user when id matches", async () => {
      const userId = 1;
      const user = [{ id: 1 }];
      prismaAsAny.app_user = {
        findUnique: jest.fn().mockReturnValueOnce(user),
      };

      const result = await UserService.getSingle(userId);

      expect(prisma.app_user.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.app_user.findUnique).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            id: userId,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  describe("getUserByEmail", () => {
    it("should return user for email when found", async () => {
      const email = "email@email.com";
      const user = { email: email };

      prismaAsAny.app_user = {
        findFirst: jest.fn().mockReturnValueOnce(user),
      };

      const result = await UserService.getUserByEmail(email);

      expect(prisma.app_user.findFirst).toHaveBeenCalledTimes(1);
      expect(prisma.app_user.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            email: email,
          },
        })
      );
      expect(result).toEqual(user);
    });
  });

  describe("createOne", () => {
    it("should return user when created", async () => {
      const email = "email@email.com";
      const first_name = "fname";
      const last_name = "lname";
      const role_id = 2;
      const newUser = {
        email,
        firstName: first_name,
        lastName: last_name,
        password: "password1!",
        role_id,
        profile_picture: "picture.png",
        created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
      };

      prismaAsAny.app_user = {
        create: jest.fn().mockReturnValueOnce(newUser),
      };

      await UserService.createOne(newUser);

      expect(prisma.app_user.create).toHaveBeenCalledTimes(1);
      expect(prisma.app_user.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            email,
            first_name,
            last_name,
            role_id,
          }),
        })
      );
    });
  });
});

describe("updateOne", () => {
  it("should return user when updated", async () => {
    const userId = 1;
    const email = "email@email.com";
    const first_name = "fname";
    const last_name = "lname";
    const role_id = 2;
    const newUser = {
      email,
      firstName: first_name,
      lastName: last_name,
      password: "password1!",
      role_id,
      profile_picture: "picture.png",
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    };

    prismaAsAny.app_user = {
      findUnique: jest.fn().mockReturnValueOnce(newUser),
      update: jest.fn().mockReturnValueOnce(newUser),
    };

    await UserService.updateOne(userId, newUser);

    expect(prisma.app_user.update).toHaveBeenCalledTimes(1);
    expect(prisma.app_user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: userId,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          role_id: true,
        },
      })
    );
  });
});

describe("deleteOne", () => {
  it("should delete user where id matches", async () => {
    const userId = 1;
    const user = {};
    prismaAsAny.app_user = { delete: jest.fn().mockReturnValueOnce(user) };

    const result = await UserService.deleteOne(userId);

    expect(prisma.app_user.delete).toHaveBeenCalledTimes(1);
    expect(prisma.app_user.delete).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          id: userId,
        },
      })
    );
    expect(result).toEqual(user);
  });
});
