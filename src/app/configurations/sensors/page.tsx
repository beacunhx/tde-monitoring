import { DataTable } from "@/components/DataTable";
import prisma from "@/lib/prisma";
import { columns } from "./columns";
import { Header } from "@/components/Header";

export default async function SensorsPage() {
  const sensors = await prisma.sensor.findMany();
  return (
    <>
      <Header title="Sensores" amount={sensors.length} />
      <DataTable columns={columns} data={sensors} />
    </>
  );
}
