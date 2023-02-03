import { AuthService, UserService } from "../../services";
import { prisma } from "../../utils/prisma";
import { prismaAsAny } from "./../../testUtil/prisma";
import { authConst } from "../../constants";
import { when } from "jest-when";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = authConst;

interface IToken {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

jest.mock("@prisma/client");
jest.mock("../../utils/prisma");
jest.mock("../../services/users");
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("Auth Service", () => {
  describe("authenticate", () => {
    it("Should return authenticated", async () => {
      const id = 1;
      const roleId = 2;
      const email = "email@email.com";
      const password = "password1!";
      const access = "accessToken";
      const refresh = "refreshToken";

      when(UserService.getUserByEmail)
        .calledWith(email)
        .mockReturnValueOnce(
          Promise.resolve({ id, email, role_id: roleId, password })
        );

      when(jwt.sign)
        .calledWith({ sub: id, roles: 2 }, ACCESS_TOKEN_SECRET, {
          expiresIn: 1200,
        })
        .mockReturnValueOnce(access);

      when(jwt.sign)
        .calledWith({ sub: id }, REFRESH_TOKEN_SECRET, {
          expiresIn: 86400,
        })
        .mockReturnValueOnce(refresh);

      when(bcrypt.compare)
        .calledWith(password, password)
        .mockReturnValueOnce(true);

      const result: any = await AuthService.authenticate(email, password);

      expect(UserService.getUserByEmail).toHaveBeenCalledTimes(1);
      expect(UserService.getUserByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, password);
      expect(jwt.sign).toHaveBeenCalledTimes(2);
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({ sub: id }),
        ACCESS_TOKEN_SECRET,
        expect.objectContaining({ expiresIn: 1200 })
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        expect.objectContaining({ sub: id }),
        REFRESH_TOKEN_SECRET,
        expect.objectContaining({ expiresIn: 86400 })
      );
      expect(result.accessToken).toBe(access);
      expect(result.refreshToken).toBe(refresh);
    });
  });
});
