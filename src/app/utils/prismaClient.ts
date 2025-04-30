import { PrismaClient, UserRole } from '../../../prisma/generated/prisma';

const prisma = new PrismaClient();

export type TUserRole = UserRole;

export default prisma;
