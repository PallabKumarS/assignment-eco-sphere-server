
        /* eslint-disable @typescript-eslint/no-explicit-any */
        import prisma from '../../utils/prismaClient';

const getAllUserFromDB = async ():Promise<any> => {
  const result = await prisma.user.findMany();
  return result;
};

export const UserService = { getAllUserFromDB };