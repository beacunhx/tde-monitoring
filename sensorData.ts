import { faker } from "@faker-js/faker";
import {
  SensorFakeDataType,
  SensorType,
  Data,
  Prisma,
  Alarm,
  AlarmType,
} from "@prisma/generated/client";
import prisma from "@/lib/prisma";

const sensorThresholds: Record<
  SensorType,
  Record<Exclude<SensorFakeDataType, "OFF">, number[] | number[][]>
> = {
  TEMPERATURE: {
    GOOD: [15, 25],
    ACCEPTABLE: [10, 30],
    ALERT: [5, 35],
    DANGEROUS: [-10, 50],
  },
  ELETRICT_CURRENT: {
    GOOD: [4, 6],
    ACCEPTABLE: [3, 7],
    ALERT: [2, 8],
    DANGEROUS: [
      [0, 3.9],
      [6, 10],
    ],
  },
  VIBRATION: {
    GOOD: [0, 2.3],
    ACCEPTABLE: [2.4, 4.5],
    ALERT: [4.5, 7.1],
    DANGEROUS: [7.2, 15],
  },
};

function isMultipleRange(arg: number[] | number[][]): arg is number[][] {
  return Array.isArray(arg[0]);
}

function getFakeSensorValue(
  type: SensorType,
  fakeDataType: Exclude<SensorFakeDataType, "OFF">,
) {
  const thresholds = sensorThresholds[type][fakeDataType];

  let range;

  if (isMultipleRange(thresholds)) {
    range = faker.helpers.arrayElement(thresholds);
  } else {
    range = thresholds;
  }

  const value = faker.number.float({
    min: range[0],
    max: range[1],
    fractionDigits: 2,
  });

  return value;
}

async function generateFakeData() {
  const sensors = await prisma.sensor.findMany({
    include: { equipament: { select: { name: true, id: true } } },
  });

  const data = sensors
    .map((sensor): Omit<Data, "id"> | null => {
      const type = sensor.type;
      const fakeDataType = sensor.fakeDataType;
      if (fakeDataType === "OFF") {
        return null;
      }
      const fakeSensorValue = getFakeSensorValue(type, fakeDataType);
      return {
        sensorId: sensor.id,
        timestamp: new Date(),
        value: new Prisma.Decimal(fakeSensorValue),
      };
    })
    .filter((v) => !!v);

  const alarm = sensors
    .filter(
      (sensor) =>
        sensor.fakeDataType === "DANGEROUS" || sensor.fakeDataType === "ALERT",
    )
    .map((sensor): Omit<Alarm, "id"> => {
      return {
        sensorId: sensor.id,
        timestamp: new Date(),
        type: sensor.fakeDataType as AlarmType,
      };
    });

  await Promise.all([
    prisma.data.createMany({ data: data }),
    prisma.alarm.createMany({ data: alarm }),
  ]);
}

const MINUTES_BETWEEN_DATA = 0.5;

async function bootstrap() {
  while (true) {
    console.log("Generating data...");
    await generateFakeData();
    console.log("Done");
    await new Promise((res) => setTimeout(res, MINUTES_BETWEEN_DATA * 60000));
  }
}

bootstrap();
