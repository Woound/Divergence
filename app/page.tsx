"use client";

import { ClientDate } from "@/components/shell/ClientDate";

const DashboardPage = () => {
  return (
    <div className="w-full flex justify-between">
      <div>
        <ClientDate />
      </div>
      <div>
        <ClientDate />
      </div>
    </div>
  );
};

export default DashboardPage;
