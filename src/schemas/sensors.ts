import { z } from "zod";

export const sensorsCreateSchema = z.object({
  name: z.string(),
  type: z.enum(["TEMPERATURE", "ELETRICT_CURRENT", "VIBRATION"]),
  equipamentId: z.string(),
});

export type SensorsCreateSchemaType = z.infer<typeof sensorsCreateSchema>;
