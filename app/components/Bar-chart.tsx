"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { useRef } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { ChartDownloadButton } from "@/components/ui/chart-download-button"

export const description = "A mixed bar chart"

// Type for individual country data
interface CountryDataPoint {
  countryName: string;
  value: number;
}

// Props type for the component
interface ChartBarMixedProps {
  data: CountryDataPoint[];
  title?: string;
  description?: string;
}

// Generate colors for countries - softer colors
const CHART_COLORS = [
  "#4f86f7",
  "#6cc24a",
  "#ff7f50",
  "#9b59b6",
  "#3498db",
  "#e74c3c",
  "#1abc9c",
  "#f39c12",
];

export function ChartBarMixed({ data, title = "Country Data", description: desc = "Selected indicators" }: ChartBarMixedProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  // Transform data for the chart
  const chartData = data.map((item, index) => ({
    country: item.countryName,
    value: item.value,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }));

  // Generate chart config dynamically
  const chartConfig: ChartConfig = {
    value: {
      label: "Value",
    },
    ...Object.fromEntries(
      data.map((item, index) => [
        item.countryName,
        {
          label: item.countryName,
          color: CHART_COLORS[index % CHART_COLORS.length],
        },
      ])
    ),
  };

  // Dynamic height based on number of countries
  const chartHeight = Math.max(100, data.length * 20 + 20);

  return (
    <Card className="mt-4" ref={chartContainerRef}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription className="text-xs">{desc}</CardDescription>
          </div>
          <ChartDownloadButton 
            chartRef={chartContainerRef} 
            filename={title.replace(/\s+/g, '-').toLowerCase()} 
          />
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full" style={{ height: `${chartHeight}px` }}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
              right: 2,
            }}
            barSize={14}
          >
            <YAxis
              dataKey="country"
              type="category"
              tickLine={false}
              tickMargin={1}
              axisLine={false}
              width={100}
              fontSize={8}
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" layout="vertical" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 text-xs pt-2">
        <div className="flex gap-2 leading-none font-medium">
          Showing data for {data.length} {data.length === 1 ? 'country' : 'countries'} <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on selected filters
        </div>
      </CardFooter>
    </Card>
  )
}
