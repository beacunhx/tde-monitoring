/*
  Warnings:

  - You are about to drop the column `unit` on the `Data` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Data" DROP COLUMN "unit";

-- DropEnum
DROP TYPE "Unit";
