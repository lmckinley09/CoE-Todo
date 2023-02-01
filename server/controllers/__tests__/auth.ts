import { when } from "jest-when";
import { AuthService } from "../../services";
import { mockRequest, mockResponse } from "../../testUtil/mockRequest";
import { authenticate, refresh } from "../auth";

jest.mock("../../services/auth");

describe("Auth Controller", () => {
  describe("authenticate", () => {
    it("should return 200 when authenticated", async () => {
      const email = "email@email.com";
      const password = "password1!";
      const req = mockRequest({ body: { email, password } });
      const res = mockResponse();
      const mockReturnValue = {} as any;

      when(AuthService.authenticate)
        .calledWith(email, password)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await authenticate(req, res);

      expect(AuthService.authenticate).toHaveBeenCalledTimes(1);
      expect(AuthService.authenticate).toHaveBeenLastCalledWith(
        email,
        password
      );
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });

  describe("refresh", () => {
    it("should return 200 when auth refreshed", async () => {
      const userId = 1;
      const req = mockRequest({});
      const res = mockResponse();
      res.locals = {
        userId: userId,
      };
      const mockReturnValue = {} as any;

      when(AuthService.refresh)
        .calledWith(userId)
        .mockReturnValueOnce(Promise.resolve(mockReturnValue));

      await refresh(req, res);

      expect(AuthService.refresh).toHaveBeenCalledTimes(1);
      expect(AuthService.refresh).toHaveBeenLastCalledWith(userId);
      expect(res.status).toHaveBeenCalledTimes(1);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(mockReturnValue);
    });
  });
});
