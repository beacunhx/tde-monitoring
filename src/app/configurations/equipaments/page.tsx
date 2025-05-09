import { DataTable } from "@/components/DataTable";
import { Header } from "@/components/Header";
import prisma from "@/lib/prisma";
import { columns } from "./columns";

export const dynamic = "auto";

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
