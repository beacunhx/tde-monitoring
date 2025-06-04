import { Header } from "@/components/Header";
import prisma from "@/lib/prisma";
import { SensorsDataForm } from "./form";

export default async function SensorsViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = Number(slug);
  const data = await prisma.sensor.findUnique({
    where: { id },
    include: { equipament: { select: { name: true, id: true } } },
  });
  return (
    <>
      <Header title={`${data?.name} - ${data?.equipament?.name}`} />
      <SensorsDataForm
        defaultValues={{ id, fakeDataType: data?.fakeDataType! }}
      />
    </>
  );
}
