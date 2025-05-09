"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  equipamentsCreateSchema,
  type EquipamentsCreateSchemaType,
} from "@/app/schemas/equipaments";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { create } from "./actions";

export function EquipamentsCreateForm() {
  const router = useRouter();

  const form = useForm<EquipamentsCreateSchemaType>({
    resolver: zodResolver(equipamentsCreateSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  });

  function onImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    form.setValue("image", event.target.files?.[0] || "");
  }

  async function onSubmit(values: EquipamentsCreateSchemaType) {
    const data = new FormData();
    data.append("name", values.name);
    data.append("image", values.image);
    const [res, err] = await create(data);
    if (err) {
      toast.error("Erro ao criar equipamento");
      return;
    }

    toast.success("Equipamento criado com sucesso");

    router.push("./");
  }

  return (
    <Form {...form}>
      <form
        className="w-1/3 space-y-6 p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Imagem</FormLabel>
          <FormControl>
            <Input
              type="file"
              accept="image/png, image/jpeg"
              onChange={onImageChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>

        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
