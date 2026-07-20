"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { ChartContainer, type ChartConfig } from "@/components/ui/chart";

const COMPLETION_COLOR = "#6EE7A8";

const chartConfig = {
  completion: {
    label: "Completion",
    color: COMPLETION_COLOR,
  },
} satisfies ChartConfig;

export function RadialChart({
  completionPercentage,
}: {
  completionPercentage: number;
}) {
  const chartData = [
    { completion: completionPercentage, fill: COMPLETION_COLOR },
  ];

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square [&_.recharts-radial-bar-sectors]:drop-shadow-[0_0_8px_rgba(110,231,168,0.7)]"
    >
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={90 - (completionPercentage / 100) * 360}
        outerRadius={90}
        innerRadius={80}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          className="first:fill-muted last:fill-background"
          polarRadius={[90, 80]}
        />
        <RadialBar dataKey="completion" background cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {completionPercentage}
                      <tspan className="text-2xl">%</tspan>
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground text-sm"
                    >
                      Complete
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
