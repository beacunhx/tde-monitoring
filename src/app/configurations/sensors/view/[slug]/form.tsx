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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  sensorFakeDataSchema,
  SensorFakeDataSchemaType,
} from "@/schemas/sensors";
import { updateFakeDataType } from "../../actions";

type SensorsDataFormProps = {
  defaultValues: SensorFakeDataSchemaType;
};

export function SensorsDataForm({ defaultValues }: SensorsDataFormProps) {
  console.log(defaultValues);
  const router = useRouter();
  const form = useForm<SensorFakeDataSchemaType>({
    resolver: zodResolver(sensorFakeDataSchema),
    defaultValues,
  });

  async function onSubmit(values: SensorFakeDataSchemaType) {
    const [, err] = await updateFakeDataType(values);
    if (err) {
      toast.error("Erro ao atulizar sensor");
      return;
    }
    toast.success("Sensor atulizado com sucesso");
  }

  return (
    <Form {...form}>
      <form
        className="w-1/3 space-y-6 p-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="fakeDataType"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Gerar dados</FormLabel>
              <FormControl>
                <RadioGroup value={value} onValueChange={onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="GOOD" id="GOOD" />
                    <Label htmlFor="GOOD">Bom</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ACCEPTABLE" id="ACCEPTABLE" />
                    <Label htmlFor="ACCEPTABLE">Aceitável</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ALERT" id="ALERT" />
                    <Label htmlFor="ALERT">Alerta</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DANGEROUS" id="DANGEROUS" />
                    <Label htmlFor="DANGEROUS">Perigo</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OFF" id="OFF" />
                    <Label htmlFor="OFF">Desligado</Label>
                  </div>
                </RadioGroup>
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
