import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

async function createOne(body: any) {
  return await prisma.app_user.create({
    data: {
      email: body.email,
      first_name: body.first_name,
      last_name: body.last_name,
      password: body.password,
      profile_picture: body.profile_picture,
      created: new Date().toISOString(),
      last_modified: new Date().toISOString(),
    },
  });
}

async function updateOne(id: number, body: any) {
  return await prisma.app_user.updateMany({
    where: {
      id,
    },
    data: {
      first_name: body.firstName,
      last_name: body.lastName,
      profile_picture: body.profile_picture,
      email: body.email,
      password: body.password,
      last_modified: new Date().toISOString(),
    },
  });
}

async function deleteOne(userId: number) {
  return await prisma.app_user.delete({
    where: {
      id: userId,
    },
  });
}

const UserService = {
  getAll,
  getSingle,
  createOne,
  updateOne,
  deleteOne,
};

export { UserService };
