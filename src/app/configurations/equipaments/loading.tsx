import { Header } from "@/components/Header";

export default function EquipamentsLoading() {
  return (
    <>
      <Header
        loading
        amount={0}
        title="Equipamentos"
        buttons={[{ label: "Criar", href: "/equipaments/create" }]}
      />
    </>
  );
}
