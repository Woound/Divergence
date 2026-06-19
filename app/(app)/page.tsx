"use client";

import { CurrentStreakChart } from "@/components/dashboard/CurrentStreakChart";
import { RadialChart } from "@/components/dashboard/RadialChart";
import { ClientDate } from "@/components/shell/ClientDate";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getGreeting } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { ThisMonthChart } from "@/components/dashboard/ThisMonthChart";
import { NonNegotiables } from "@/components/dashboard/NonNegotiables";
import { HowWasToday } from "@/components/dashboard/HowWasToday";
import { CompletionOverTimeChart } from "@/components/dashboard/CompletionOverTimeChart";
import { ConsistencyCalendar } from "@/components/dashboard/ConsistencyCalendar";
import { Reflection } from "@/components/dashboard/Reflection";

const DashboardPage = () => {
  const [greeting, setGreeting] = useState("");
  useEffect(() => {
    const receivedGreeting = getGreeting();
    setGreeting(receivedGreeting);
  }, []);

  return (
    <div className="w-full px-4 mt-2.5">
      <div className="relative flex justify-between">
        <div id="currentDates">
          <ClientDate />
        </div>
        <div className="absolute right-0 top-0 flex flex-col items-end">
          <ClientDate showTime />
        </div>
      </div>
      <div>
        <h1 className=" mt-3.5 text-3xl font-semibold">
          Good {greeting} Wound.
        </h1>
        <p className="mt-2 text-gray-300">
          11-day run going. 10 points left to keep it alive today.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* TODAY */}
        <Card className="lg:row-span-2">
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <CardDescription>Your daily non-negotiables</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center">
            <div className="w-64">
              <RadialChart />
            </div>
            <div>
              <h2 className="text-4xl">
                0<span className="text-xl">/10</span>
              </h2>
              <p className="mt-1.5 text-sm text-muted-foreground">
                9 points from a complete day.
              </p>
            </div>
          </CardContent>
          <div className="-mt-6 px-14">
            <NonNegotiables />
          </div>
        </Card>

        {/* CURRENT STREAK */}
        <Card>
          <CardHeader>
            <CardTitle>Current Streak</CardTitle>
            <CardAction>
              <p className="px-2 rounded-full bg-emerald-200/10 outline-1 outline-emerald-600/60 text-muted-foreground">
                <Circle className=" w-4 inline pr-1 fill-emerald-300 outline-emerald-300" />
                Personal best
              </p>
            </CardAction>
          </CardHeader>
          <CardContent>
            <p className="text-5xl flex items-end gap-1 font-semibold">
              11 <span className="text-xl font-normal">days</span>
            </p>
            <div className="flex gap-1 mt-1">
              <p className=" text-muted-foreground">Best run - </p>
              <span className=" text-muted-foreground">11 days</span>
            </div>
            <div>
              <CurrentStreakChart />
            </div>
          </CardContent>
        </Card>

        {/* THIS MONTH */}
        <Card>
          <CardHeader>
            <CardTitle>This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-5xl flex items-end gap-1 font-semibold">
              83 <span className="text-xl font-normal">%</span>
            </p>
            <div className="flex gap-1 mt-1">
              <p className=" text-muted-foreground">5/6 days complete</p>
            </div>
            <div>
              <ThisMonthChart />
            </div>
          </CardContent>
        </Card>

        {/* HOW WAS TODAY */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>How Was Today</CardTitle>
            <CardDescription>Mood, a rating, and a quick note</CardDescription>
            <CardAction>Not logged yet</CardAction>
          </CardHeader>
          <CardContent>
            <HowWasToday />
          </CardContent>
        </Card>
      </div>

      {/* COMPLETION OVER TIME */}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Completion Over Time</CardTitle>
          <CardDescription>The long arc of your consistency</CardDescription>
        </CardHeader>
        <CardContent>
          <CompletionOverTimeChart />
        </CardContent>
      </Card>

      {/* CONSISTENCY CALENDAR + REFLECTION */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Consistency Calendar</CardTitle>
            <CardDescription>Every day, the last 20 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ConsistencyCalendar />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Reflection />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
