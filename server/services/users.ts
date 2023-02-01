import { prisma } from "../utils/prisma";
import bcrypt from "bcryptjs";
interface IUser {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  profile_picture?: string;
  role_id?: number;
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

const getUserByEmail = async (email: string) => {
  return await prisma.app_user.findFirst({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      role_id: true,
      password: true,
    },
  });
};

const createOne = async (user: IUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await prisma.app_user.create({
    data: {
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      password: hashedPassword,
      role_id: 2,
      profile_picture: user.profile_picture,
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role_id: true,
    },
  });
};

const updateOne = async (userId: number, user: IUser) => {
  const userToUpdate = await getSingle(userId);
  if (!userToUpdate) return;
  const hashedPassword = await bcrypt.hash(user.password, 10);
  return await prisma.app_user.update({
    where: {
      id: userId,
    },
    data: {
      first_name: user.first_name,
      last_name: user.last_name,
      profile_picture: user.profile_picture,
      email: user.email,
      password: hashedPassword,
      last_modified: new Date().toISOString(),
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      role_id: true,
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
  getUserByEmail,
};

export { UserService };
