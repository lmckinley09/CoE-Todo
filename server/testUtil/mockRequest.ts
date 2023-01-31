import { Request, Response } from "express";

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

  const user = {
    id: 1,
    role_id: 1,
  };

  return {
    ...args,
    user,
    get,
  } as unknown as Request;
};

const mockResponse = () => {
  const res = {} as Response;
  res.sendStatus = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

export { mockRequest, mockResponse };
