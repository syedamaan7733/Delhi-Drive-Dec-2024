import React, { useEffect, useState } from "react";

const formatDate = (date) => {
  return date.toISOString().split("T")[0];
};

const DateInput = ({
  label,
  value,
  onChange,
  style = {},
  disabled = false,
}) => {
  return (
    <div className="relative group">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(new Date(e.target.value))}
        className="
          w-full 
          px-4 
          py-3 
          border-2 
          border-gray-300 
          rounded-lg 
          text-gray-700 
          focus:outline-none 
          focus:ring-2 
          focus:ring-blue-500 
          focus:border-transparent 
          transition-all 
          duration-300 
          appearance-none 
          bg-white 
          hover:border-blue-300
        "
        style={style}
        disabled={disabled}
      />
      <label
        className="
          absolute 
          left-3 
          -top-2 
          bg-white 
          px-1 
          text-xs 
          text-gray-500 
          group-focus-within:text-blue-600 
          transition-all 
          duration-300
        "
      >
        {label}
      </label>
    </div>
  );
};

const PresetButtons = ({ onPresetSelect, activePreset, style = {} }) => {
  const presets = [
    { id: "today", label: "Today" },
    { id: "yesterday", label: "Yesterday" },
    { id: "thisMonth", label: "This Month" },
    { id: "lastMonth", label: "Last Month" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <div className="flex space-x-2 mb-6 overflow-x-auto p-5">
      {presets.map((preset) => (
        <button
          key={preset.id}
          onClick={() => onPresetSelect(preset.id)}
          className={`
            px-4 
            py-2 
            rounded-full 
            text-sm 
            font-medium 
            transition-all 
            duration-300 
            ease-in-out 
            transform 
            hover:scale-105 
            focus:outline-none 
            focus:ring-2 
            focus:ring-offset-2 
            ${
              activePreset === preset.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }
          `}
          style={style}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

const CustomDateRange = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  style = {},
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <DateInput
        label="From"
        value={formatDate(startDate)}
        onChange={onStartDateChange}
        style={style}
      />
      <DateInput
        label="To"
        value={formatDate(endDate)}
        onChange={onEndDateChange}
        style={style}
        disabled={false}
      />
    </div>
  );
};

export const DatePicker = ({ onDateRangeSelect, style = {} }) => {
  const [activePreset, setActivePreset] = useState("today");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handlePresetSelect = (preset) => {
    const today = new Date();

    switch (preset) {
      case "today":
        setStartDate(today);
        setEndDate(today);
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        setStartDate(yesterday);
        setEndDate(yesterday);
        break;
      case "thisMonth":
        const firstDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        );
        const lastDayOfMonth = new Date(
          today.getFullYear(),
          today.getMonth() + 1,
          0
        );
        setStartDate(firstDayOfMonth);
        setEndDate(lastDayOfMonth);
        break;
      case "lastMonth":
        const firstDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth() - 1,
          1
        );
        const lastDayOfLastMonth = new Date(
          today.getFullYear(),
          today.getMonth(),
          0
        );
        setStartDate(firstDayOfLastMonth);
        setEndDate(lastDayOfLastMonth);
        break;
      case "custom":
        setStartDate(today);
        setEndDate(today);
        break;
    }

    setActivePreset(preset);
  };

  useEffect(() => {
    if (endDate < startDate) {
      setEndDate(startDate);
    }

    onDateRangeSelect({
      preset: activePreset,
      startDate,
      endDate,
    });
  }, [startDate, endDate, activePreset]);

  const defaultStyle = {
    container: {
      fontFamily:
        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      borderRadius: "12px",
      background: "white",
    },
    presetButtons: {
      fontSize: "14px",
    },
    dateInputs: {
      fontSize: "14px",
    },
  };

  const mergedStyles = {
    container: { ...defaultStyle.container, ...style.container },
    presetButtons: { ...defaultStyle.presetButtons, ...style.presetButtons },
    dateInputs: { ...defaultStyle.dateInputs, ...style.dateInputs },
  };

  return (
    <div
      className="
        date-picker-container 
        p-6 
        rounded-xl 
        bg-white 
        shadow-2xl 
        border 
        border-gray-100 
        transition-all 
        duration-500 
        ease-in-out
      "
      style={mergedStyles.container}
    >
      <h2
        className="
          text-xl 
          font-semibold 
          text-gray-800 
          mb-6 
          text-center 
          tracking-tight
        "
      >
        Select Date Range
      </h2>

      <PresetButtons
        onPresetSelect={handlePresetSelect}
        activePreset={activePreset}
        style={mergedStyles.presetButtons}
      />

      {activePreset === "custom" && (
        <CustomDateRange
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          style={mergedStyles.dateInputs}
        />
      )}
    </div>
  );
};
