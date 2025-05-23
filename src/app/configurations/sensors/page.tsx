import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import prisma from "@/lib/prisma";
import { columns } from "./columns";

export const dynamic = "auto";

export default async function SensorsPage() {
  const data = await prisma.sensor.findMany({
    include: { equipament: { select: { name: true, id: true } } },
  });
  return (
    <>
      <Header
        title="Sensores"
        amount={data.length}
        buttons={[{ label: "Criar", href: "/sensors/create" }]}
      />
      <DataTable columns={columns} data={data} />
    </>
  );
}
