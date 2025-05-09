"use client";

import { Equipament } from "@prisma/generated/client";
import { createColumnHelper } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

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
    cell: () => {
      return (
        <Button variant="ghost" size="sm">
          <Trash />
        </Button>
      );
    },
  }),
];
