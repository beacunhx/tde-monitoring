-- CreateEnum
CREATE TYPE "AlarmType" AS ENUM ('ALERT', 'DANGEROUS');

-- CreateTable
CREATE TABLE "Alarm" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "type" "AlarmType" NOT NULL,
    "sensorId" INTEGER,

    CONSTRAINT "Alarm_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Alarm" ADD CONSTRAINT "Alarm_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
