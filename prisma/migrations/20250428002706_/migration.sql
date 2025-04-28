/*
  Warnings:

  - You are about to drop the column `image_url` on the `Sensor` table. All the data in the column will be lost.
  - Added the required column `name` to the `Sensor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sensor" DROP COLUMN "image_url",
ADD COLUMN     "name" TEXT NOT NULL;
