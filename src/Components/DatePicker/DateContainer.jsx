import React, { useEffect, useState } from "react";
import { DatePicker } from "./DatePicker";
export function DateContainer() {
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  const handleDateRangeSelect = (dateRange) => {
    setSelectedDateRange(dateRange);
    console.log("Selected Date Range:", dateRange);
  };

  return (
    <div className="flex justify-center px-4 items-center min-h-screen bg-gray-50">
      <h1 class=" mt-8 bg-gradient-to-r from-slate-500 to-slate-800 inline-block text-3xl  text-transparent bg-clip-text underline font-bold">
        Assignment - III
      </h1>
      <DatePicker
        onDateRangeSelect={handleDateRangeSelect}
        style={{
          container: {
            backgroundColor: "#ffffff",
            borderRadius: "16px",
          },
        }}
      />
    </div>
  );
}
