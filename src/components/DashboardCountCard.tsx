import React from "react";

function DashboardCountCard() {
  return (
    <div className="flex flex-wrap w-full p-4 my-5 text-gray-500">
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-user mr-1"></i>
          Počet uživatelů
        </span>
        <div className="text-4xl font-bold">52</div>
      </div>
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-shopping-bag mr-1"></i>
          Počet objednávek
        </span>
        <div className="text-4xl font-bold">12</div>
      </div>
      <div className="px-3 mb-2 sm:mb-0 relative tile_stats_count">
        <span className="text-sm">
          <i className="fa fa-dollar mr-1"></i>
          Výdělek za měsíc
        </span>
        <div className="text-4xl font-bold">52 KČ</div>
      </div>
    </div>
  );
}

export default DashboardCountCard;
