import { Header } from "@/components/Header";
import { TableSkeleton } from "@/components/TableSkeleton";

export default function EquipamentsLoading() {
  return (
    <>
      <Header
        loading
        amount={0}
        title="Equipamentos"
        buttons={[{ label: "Criar", href: "/equipaments/create" }]}
      />
      <TableSkeleton columns={[20, 150, 20]} />
    </>
  );
}
