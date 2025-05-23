"use client";

import { Equipament } from "@prisma/generated/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteById } from "./actions";

const columnHelper = createColumnHelper<Equipament>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 0,
    cell: ({ getValue }) => getValue().toString(),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
  }),
  columnHelper.display({
    header: "Ações",
    size: 0,
    cell: ({ row }) => {
      const router = useRouter();
      async function onDelete(id: number) {
        const [, err] = await deleteById(id);
        if (err) {
          toast.error("Erro ao excluir equipamento");
          return;
        }
        toast.success("Equipamento excluido com sucesso");
        router.refresh();
      }
      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(row.original.id)}
        >
          <Trash />
        </Button>
      );
    },
  }),
];
