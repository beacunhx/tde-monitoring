"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  sensorsCreateSchema,
  SensorsCreateSchemaType,
} from "@/schemas/sensors";
import { create } from "../actions";

export function SensorsCreateForm() {
  const router = useRouter();

  const form = useForm<SensorsCreateSchemaType>({
    resolver: zodResolver(sensorsCreateSchema),
    defaultValues: {
      name: "",
      type: "TEMPERATURE",
      equipamentId: "",
    },
  });

  async function onSubmit(values: SensorsCreateSchemaType) {
    const [, err] = await create(values);
    if (err) {
      toast.error("Erro ao criar sensor");
      return;
    }
    toast.success("Sensor criado com sucesso");
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
        <FormField
          control={form.control}
          name="type"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <FormControl>
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o tipo de sensor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="TEMPERATURE">Temperatura</SelectItem>
                    <SelectItem value="ELETRICT_CURRENT">
                      Corrente elétrica
                    </SelectItem>
                    <SelectItem value="VIBRATION">Vibração</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="equipamentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Equipameto</FormLabel>
              <FormControl>
                <Input placeholder="Equipamento" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Enviar</Button>
      </form>
    </Form>
  );
}
