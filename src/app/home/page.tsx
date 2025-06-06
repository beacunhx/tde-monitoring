import { format } from "date-fns";
import { Cog, OctagonAlert, TriangleAlert, Webcam } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function HomePage() {
  const equipaments = await prisma.equipament.findMany({
    include: { _count: { select: { sensors: true } } },
  });
  const alarms = await prisma.alarm.findMany({
    take: 5,
    include: {
      Sensor: {
        include: { equipament: { select: { name: true } } },
      },
    },
    orderBy: { timestamp: "desc" },
  });
  return (
    <>
      <Header title="Monitoramento" />
      <div className="flex items-start gap-2">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Máquinas</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col divide-y">
              {equipaments.map((equipament) => (
                <li key={`equipament_${equipament.id}`}>
                  <Link
                    href={"/home/" + equipament.id}
                    className="flex items-center gap-4 py-6"
                  >
                    <Cog size={16} />
                    <span className="font-medium">{equipament.name}</span>
                    <Webcam size={16} className="ml-auto" />
                    <span>{equipament._count.sensors}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Alarmes recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {alarms.map((alarm) => (
                <li key={`alarm${alarm.id}`}>
                  <Alert
                    variant={
                      alarm.type === "DANGEROUS" ? "destructive" : "default"
                    }
                  >
                    {alarm.type === "ALERT" ? (
                      <TriangleAlert />
                    ) : (
                      <OctagonAlert />
                    )}
                    <AlertTitle>
                      {alarm.Sensor?.equipament?.name} - {alarm.Sensor?.name}
                    </AlertTitle>
                    <AlertDescription>
                      {format(alarm.timestamp, "dd/MM/yyyy 'às' HH:mm:ss")}
                    </AlertDescription>
                  </Alert>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
