import React from "react";
import DashboardCountCard from "../components/DashboardCountCard";
import DashboardOrderCard from "../components/DashboardOrderCard";
import DashboardMessageCard from "../components/DashboardMessageCard";
function Home() {
  return (
    <div className="relative h-screen">
      <DashboardCountCard />

      <div className="w-full h-96 bg-green-200 p-4 text-lg"></div>
      <div className="flex flex-wrap w-full text-lg">
        <DashboardOrderCard />
        <DashboardMessageCard />
      </div>
    </div>
  );
}

export default Home;
