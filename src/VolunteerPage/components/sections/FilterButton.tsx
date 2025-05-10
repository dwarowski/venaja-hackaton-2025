import React, { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { TimeRange } from "../../../global_functions/Datetime_redact";

interface DateFilterButtonProps {
  onFilterChange: (range: TimeRange | null) => void;
}

export const FilterButton: React.FC<DateFilterButtonProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempStart, setTempStart] = useState<Date | null>(null);
  const [tempEnd, setTempEnd] = useState<Date | null>(null);
  const [range, setRange] = useState<TimeRange | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (range) {
      // Сброс фильтрации
      setRange(null);
      setTempStart(null);
      setTempEnd(null);
      onFilterChange(null);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const applyFilter = () => {
    if (tempStart && tempEnd) {
      const newRange: TimeRange = [tempStart, tempEnd];
      setRange(newRange);
      onFilterChange(newRange);
      setIsOpen(false);
    }
  };

  const displayLabel = range
    ? `с ${format(range[0], "dd.MM")} по ${format(range[1], "dd.MM")}`
    : "Фильтровать по дате";

  return (
    <div ref={ref} className="relative inline-block">
      <button
        className={`tab-button ${range ? "button-active" : "button-inactive"}`}
        onClick={handleToggle}
      >
        {displayLabel}
      </button>

      {isOpen && (
        <div className="calendar-popup absolute bg-white border rounded shadow-md p-3 mt-2 z-10">
          <label className="block text-sm mb-2">
            С:
            <input
              type="date"
              className="block w-full mt-1 p-1 border rounded"
              onChange={(e) => setTempStart(new Date(e.target.value))}
            />
          </label>
          <label className="block text-sm mb-2 mt-2">
            По:
            <input
              type="date"
              className="block w-full mt-1 p-1 border rounded"
              onChange={(e) => setTempEnd(new Date(e.target.value))}
            />
          </label>
          <button
            onClick={applyFilter}
            disabled={!tempStart || !tempEnd}
            className="mt-3 w-full bg-blue-500 text-white py-1 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Применить
          </button>
        </div>
      )}
    </div>
  );
};
