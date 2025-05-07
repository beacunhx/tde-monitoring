import { z } from "zod";

export const equipamentsCreateSchema = z.object({
  name: z.string(),
  image: z.instanceof(File).or(z.string()),
});

export type EquipamentsCreateSchemaType = z.infer<
  typeof equipamentsCreateSchema
>;
