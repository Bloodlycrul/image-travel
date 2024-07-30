import { PrismaClient } from "@prisma/client";

declare global {
  var database: PrismaClient | undefined;
}

let database = global.database || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.database = database;

export { database };
