"use client";

import { Sensor, SensorType, Equipament } from "@prisma/generated/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { deleteById } from "./actions";

const SENSOR_TYPES: Record<SensorType, string> = {
  TEMPERATURE: "Temperatura",
  ELETRICT_CURRENT: "Corrente elétrica",
  VIBRATION: "Vibração",
};

const columnHelper = createColumnHelper<
  Sensor & { equipament: Pick<Equipament, "name" | "id"> | null }
>();

export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    size: 0,
    cell: ({ getValue }) => getValue().toString(),
  }),
  columnHelper.accessor("name", {
    header: "Nome",
  }),
  columnHelper.accessor("type", {
    header: "Tipo",
    cell: ({ getValue }) => SENSOR_TYPES[getValue()],
  }),
  columnHelper.accessor("equipament", {
    header: "Equipamento",
    cell: ({ getValue }) => {
      const value = getValue();
      return `${value?.id} - ${value?.name}`;
    },
  }),
  columnHelper.display({
    header: "Ações",
    size: 0,
    cell: ({ row }) => {
      const router = useRouter();
      async function onDelete(id: number) {
        const [, err] = await deleteById(id);
        if (err) {
          toast.error("Erro ao excluir sensor");
          return;
        }
        toast.success("Sensor excluido com sucesso");
        router.refresh();
      }
      return (
        <div className="flex gap-2">
          <Button size="sm" variant="ghost" asChild>
            <Link href={"./sensors/view/" + row.original.id}>
              <Eye />
            </Link>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(row.original.id)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  }),
];
