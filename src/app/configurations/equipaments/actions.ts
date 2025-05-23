"use server";

import prisma from "@/lib/prisma";

export async function create(data: FormData) {
  try {
    const name = data.get("name") as string;
    const image = data.get("image") as File;

    const arrayBuffer = await image.arrayBuffer();
    const image_url = Buffer.from(arrayBuffer).toString("base64url");

    await prisma.equipament.create({ data: { name, image_url } });

    return ["ok", null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
}

export async function deleteById(id: number) {
  try {
    await prisma.equipament.delete({ where: { id } });
    return ["ok", null];
  } catch (e) {
    console.error(e);
    return [null, e];
  }
}
