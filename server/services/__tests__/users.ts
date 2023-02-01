import { UserService } from "../users";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";
import { when } from "jest-when";

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
});
