"use server";

import prisma from "@/lib/prisma";
import { SensorsCreateSchemaType } from "@/schemas/sensors";

export async function create(data: SensorsCreateSchemaType) {
  try {
    await prisma.sensor.create({
      data: { ...data, equipamentId: Number(data.equipamentId) },
    });
    return ["ok", null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
}

export async function deleteById(id: number) {
  try {
    await prisma.sensor.delete({ where: { id } });
    return ["ok", null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
}
