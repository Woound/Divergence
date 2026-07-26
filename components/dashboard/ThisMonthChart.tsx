"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A simple area chart";

const chartData = [
  { month: "January", desktop: 200 },
  { month: "February", desktop: 400 },
  { month: "March", desktop: 150 },
  { month: "April", desktop: 125 },
  { month: "May", desktop: 230 },
  { month: "June", desktop: 200 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#6EE7A8",
  },
} satisfies ChartConfig;

export function ThisMonthChart() {
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
