-- AlterTable
ALTER TABLE "USER" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "image" SET DEFAULT 'null';
