import { z } from "zod";

export const sensorsCreateSchema = z.object({
  name: z.string(),
  type: z.enum(["TEMPERATURE", "ELETRICT_CURRENT", "VIBRATION"]),
  equipamentId: z.string(),
});

export type SensorsCreateSchemaType = z.infer<typeof sensorsCreateSchema>;

export const sensorFakeDataSchema = z.object({
  id: z.number(),
  fakeDataType: z.enum(["GOOD", "ACCEPTABLE", "ALERT", "DANGEROUS", "OFF"]),
});

export type SensorFakeDataSchemaType = z.infer<typeof sensorFakeDataSchema>;
