-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('TEMPERATURE', 'ELETRICT_CURRENT', 'VIBRATION');

-- CreateEnum
CREATE TYPE "Unit" AS ENUM ('CELSIUS', 'AMPERE', 'MILLIMETERS_PER_SECOND');

-- CreateTable
CREATE TABLE "Equipament" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Equipament_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "type" "SensorType" NOT NULL,
    "equipamentId" INTEGER,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Data" (
    "id" SERIAL NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "unit" "Unit" NOT NULL,
    "sensorId" INTEGER,

    CONSTRAINT "Data_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_equipamentId_fkey" FOREIGN KEY ("equipamentId") REFERENCES "Equipament"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Data" ADD CONSTRAINT "Data_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
