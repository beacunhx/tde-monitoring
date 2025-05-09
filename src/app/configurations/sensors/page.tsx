import { Sensor } from "@prisma/generated/client";
import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import prisma from "@/lib/prisma";
import { columns } from "./columns";

const SENSOR_TYPES = {
  TEMPERATURE: "Temperatura",
  ELETRICT_CURRENT: "Corrente elétrica",
  VIBRATION: "Vibração",
};

export default async function SensorsPage() {
  const data = await prisma.sensor.findMany();
  const sensors = data.map((sensor) => ({
    ...sensor,
    type: SENSOR_TYPES[sensor.type] as Sensor["type"],
  }));
  return (
    <>
      <Header
        title="Sensores"
        amount={sensors.length}
        buttons={[{ label: "Criar", href: "/sensors/create" }]}
      />
      <DataTable columns={columns} data={sensors} />
    </>
  );
}
