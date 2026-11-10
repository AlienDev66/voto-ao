import { PrismaClient } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  prismaModelsVersion?: number;
};

/** Bump when schema models change so the dev singleton is recreated. */
const PRISMA_MODELS_VERSION = 3;

function createClient() {
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

if (
  !globalForPrisma.prisma ||
  globalForPrisma.prismaModelsVersion !== PRISMA_MODELS_VERSION
) {
  void globalForPrisma.prisma?.$disconnect().catch(() => undefined);
  globalForPrisma.prisma = createClient();
  globalForPrisma.prismaModelsVersion = PRISMA_MODELS_VERSION;
}

const client = globalForPrisma.prisma;

/** Prisma client; marks the route dynamic so seed updates appear without rebuild. */
export const prisma = new Proxy(client, {
  get(target, prop, receiver) {
    noStore();
    const value = Reflect.get(target, prop, receiver);
    return typeof value === "function" ? value.bind(target) : value;
  },
}) as PrismaClient;
