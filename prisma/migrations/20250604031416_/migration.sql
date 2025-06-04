-- CreateEnum
CREATE TYPE "SensorFakeDataType" AS ENUM ('GOOD', 'ACCEPTABLE', 'ALERT', 'DANGEROUS', 'OFF');

-- AlterTable
ALTER TABLE "Sensor" ADD COLUMN     "fakeDataType" "SensorFakeDataType" NOT NULL DEFAULT 'OFF';
