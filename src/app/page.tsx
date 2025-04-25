import prisma from "@/lib/prisma";

export default async function IndexPage() {
  const equipament = await prisma.equipament.findMany();
  return equipament.map(({ name }) => <div key={name}>{name}</div>);
}
