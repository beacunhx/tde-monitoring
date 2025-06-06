import { Cog, Webcam } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { RecentAlarms } from "@/components/RecentAlarms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

export default async function MonitoringPage() {
  const [equipaments, alarms] = await Promise.all([
    prisma.equipament.findMany({
      include: { _count: { select: { sensors: true } } },
    }),
    prisma.alarm.findMany({
      take: 5,
      include: {
        Sensor: {
          include: { equipament: { select: { name: true } } },
        },
      },
      orderBy: { timestamp: "desc" },
    }),
  ]);
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
                <li
                  key={`equipament_${equipament.id}`}
                  className="first:[&_a]:pt-0 last:[&_a]:pb-0"
                >
                  <Link
                    href={"/monitoring/view/" + equipament.id}
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
        <RecentAlarms
          className="flex-1"
          data={alarms.map((alarm) => ({
            id: alarm.id,
            type: alarm.type,
            timestamp: alarm.timestamp,
            equipmentName: alarm.Sensor?.equipament?.name,
            sensorName: alarm.Sensor?.name,
          }))}
        />
      </div>
    </>
  );
}
