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

    useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (!range) {
            setTempStart(null);
            setTempEnd(null);
        }
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [range]);


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
    else {
        setTempStart(null);
        setTempEnd(null);
    }
  };

  const displayLabel = range
    ? `с ${format(range[0], "dd.MM")} по ${format(range[1], "dd.MM")}`
    : "Фильтровать по дате";

  return (
  <div ref={ref}>
    <button
      className={`tab-button sort-button-wrapper ${range ? "button-active" : "button-inactive"}`}
      onClick={handleToggle}
    >
      {displayLabel}
    </button>

      {isOpen && (
        <div className="calendar-popup">
            <div className="data-input">
                <div>С</div>
                <div>
                    <input
                type="date"
                onChange={(e) => setTempStart(new Date(e.target.value))}
                    />
                </div>
                <div>по</div>
                <div>
                    <input
                        type="date"
                        onChange={(e) => setTempEnd(new Date(e.target.value))}
                    />
                </div>
            </div>
            <div className="data-input-accept">
                <button
                    onClick={applyFilter}
                    disabled={!tempStart || !tempEnd}
                    className={(!tempStart || !tempEnd) ? "button-inactive" : "button-active"}
                >     
                Применить
                </button>
            </div>
        </div>
      )}
    </div>
  );
};
