import { PrismaClient, UserRole } from '../../../prisma/generated';

const prisma = new PrismaClient();

export type TUserRole = UserRole;

export default prisma;
