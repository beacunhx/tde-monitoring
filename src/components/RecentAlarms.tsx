import { AlarmType } from "@prisma/generated/client";
import { format } from "date-fns";
import { OctagonAlert, TriangleAlert } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type RecentAlarmsProps = {
  className?: string;
  data: {
    id: number;
    type: AlarmType;
    timestamp: Date;
    sensorName?: string;
    equipmentName?: string;
  }[];
};

export function RecentAlarms({ data, className }: RecentAlarmsProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Alarmes recentes</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length ? (
          <ul className="flex flex-col gap-2">
            {data.map((alarm) => (
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
                    {alarm.equipmentName} - {alarm.sensorName}
                  </AlertTitle>
                  <AlertDescription>
                    {format(alarm.timestamp, "dd/MM/yyyy 'às' HH:mm:ss")}
                  </AlertDescription>
                </Alert>
              </li>
            ))}
          </ul>
        ) : (
          <CardDescription>Sem alarmes</CardDescription>
        )}
      </CardContent>
    </Card>
  );
}
