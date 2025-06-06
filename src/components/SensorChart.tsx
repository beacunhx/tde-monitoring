"use client";

import { SensorType } from "@prisma/generated/client";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartConfig, ChartContainer } from "./ui/chart";

const chartConfig = {
  time: {
    label: "Time",
    color: "#2563eb",
  },
  value: {
    label: "Value",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

type SensorChartProps = {
  type?: SensorType;
  data?: { time: string; value: number }[];
};

const SENSOR_TYPES: Record<SensorType, string> = {
  TEMPERATURE: " ºC",
  ELETRICT_CURRENT: " A",
  VIBRATION: " mm/s",
};

export function SensorChart({ data, type = "VIBRATION" }: SensorChartProps) {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#1E90FF" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#1E90FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" />
        <YAxis domain={[0, 2]} unit={SENSOR_TYPES[type]} width={80} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => `${Number(value).toFixed(3)} g`} />
        <Area
          type="monotone"
          dataKey="value"
          stroke="#1E90FF"
          fillOpacity={1}
          fill="url(#colorValue)"
        />
      </AreaChart>
    </ChartContainer>
  );
}
