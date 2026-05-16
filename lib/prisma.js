import { PrismaClient } from '../app/generated/prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';

const globalForPrisma = globalThis;

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.warn('DATABASE_URL is not set. Prisma client might fail.');
  }

  // In @prisma/adapter-neon v7.x, PrismaNeon is a factory that accepts
  // Pool config options (not a Pool instance). It creates the Pool internally.
  const adapter = new PrismaNeon({ connectionString });
  return new PrismaClient({ adapter });
}

const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
