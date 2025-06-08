import { format } from "date-fns";
import { Webcam } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { RecentAlarms } from "@/components/RecentAlarms";
import { SensorChart } from "@/components/SensorChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";

type ViewMonitoringPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export default async function ViewMonitoringPage({
  params,
  searchParams,
}: ViewMonitoringPageProps) {
  const [{ slug }, { id: searchParam }] = await Promise.all([
    params,
    searchParams,
  ]);

  const id = Number(slug);

  const [equipament, alarms] = await Promise.all([
    prisma.equipament.findUnique({
      where: { id },
      include: { sensors: { include: { data: true } } },
    }),
    prisma.alarm.findMany({
      take: 5,
      where: { Sensor: { equipamentId: id } },
      include: { Sensor: { select: { name: true } } },
      orderBy: { timestamp: "desc" },
    }),
  ]);

  const sensorId = searchParam
    ? Number(searchParam)
    : equipament?.sensors[0].id;

  const selectedSensor = equipament?.sensors.find((v) => v.id === sensorId);

  const chartData = selectedSensor?.data.map(({ value, timestamp }) => ({
    value: value.toNumber(),
    time: format(timestamp, "HH:mm"),
  }));

  return (
    <>
      <Header title={"Monitoramento - " + equipament?.name} />
      <div className="flex items-start gap-2">
        <div className="flex flex-1 flex-col gap-2">
          <Card>
            <CardHeader>
              <CardTitle>Sensores</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-col">
                {equipament?.sensors.map((sensor) => (
                  <li key={`equipament_${sensor.id}`}>
                    <Link
                      href={"?id=" + sensor.id}
                      data-active={sensor.id === sensorId}
                      className="flex items-center gap-4 rounded-lg p-4 data-[active='true']:bg-muted"
                    >
                      <Webcam size={16} />
                      <span className="font-medium">{sensor.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <RecentAlarms
            data={alarms.map((alarm) => ({
              id: alarm.id,
              type: alarm.type,
              timestamp: alarm.timestamp,
              equipmentName: equipament?.name,
              sensorName: alarm.Sensor?.name,
            }))}
          />
        </div>

        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Gráfico</CardTitle>
          </CardHeader>
          <CardContent>
            <SensorChart data={chartData} type={selectedSensor?.type} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
