"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#6EE7A8",
  },
} satisfies ChartConfig;

export function CurrentStreakChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-28 w-full mt-4 [&_.recharts-area-curve]:drop-shadow-[0_0_6px_rgba(110,231,168,0.7)]"
    >
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          top: 4,
          bottom: 0,
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} horizontal={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
          hide
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="desktop"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.075}
          stroke="var(--color-desktop)"
          baseValue={"dataMin"}
        />
      </AreaChart>
    </ChartContainer>
  );
}
