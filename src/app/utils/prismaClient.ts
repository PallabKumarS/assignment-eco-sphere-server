import { PrismaClient, UserRole } from '../../../prisma/generated/client';

const prisma = new PrismaClient();

export type TUserRole = UserRole;

export default prisma;
