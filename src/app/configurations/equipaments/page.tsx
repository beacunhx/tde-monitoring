import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import { Header } from "@/components/Header";

export default async function EquipamentsPage() {
  const equipaments = await prisma.equipament.findMany();
  return (
    <>
      <Header
        title="Equipamentos"
        amount={equipaments.length}
        buttons={[{ label: "Criar", href: "/equipaments/create" }]}
      />
      <DataTable columns={columns} data={equipaments} />
    </>
  );
}
