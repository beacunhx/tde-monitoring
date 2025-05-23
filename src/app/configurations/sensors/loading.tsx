import { Header } from "@/components/Header";
import { TableSkeleton } from "@/components/TableSkeleton";

export default function SensorsLoading() {
  return (
    <>
      <Header
        loading
        amount={0}
        title="Sensores"
        buttons={[{ label: "Criar", href: "/sensors/create" }]}
      />
      <TableSkeleton columns={[20, 150, 150, 150, 20]} />
    </>
  );
}
