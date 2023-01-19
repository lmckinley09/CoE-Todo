import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_picture?: string;
  created?: string;
  last_modified?: string;
}

const getAll = async () => {
  return await prisma.app_user.findMany({
    select: {
      id: true,
      email: true,
      first_name: true,
      last_name: true,
    },
  });
};

const getSingle = async (userId: number) => {
  return await prisma.app_user.findUnique({
    where: {
      id: userId,
    },
  });
};

const createOne = async (user: IUser) => {
  return await prisma.app_user.create({
    data: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: user.password,
      profile_picture: user.profile_picture,
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    },
  });
};

const updateOne = async (userId: number, user: IUser) => {
  const userToUpdate = await getSingle(userId);
  if (!userToUpdate) return;

  return await prisma.app_user.updateMany({
    where: {
      id: userId,
    },
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
      email: user.email,
      password: user.password,
      last_modified: new Date().toISOString(),
    },
  });
};

const deleteOne = async (userId: number) => {
  return await prisma.app_user.delete({
    where: {
      id: userId,
    },
  });
};

const UserService = {
  getAll,
  getSingle,
  createOne,
  updateOne,
  deleteOne,
};

export { UserService };
