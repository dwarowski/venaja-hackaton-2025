import React, { useState } from 'react';
import { addDays } from 'date-fns';

interface CalendarPopupProps {
  onFilter: (start: Date, end: Date) => void;
}

const CalendarPopup: React.FC<CalendarPopupProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addDays(new Date(), 7));

  const applyFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="calendar-content">
      <div className="calendar-fields">
        <label>
          От:
          <input
            type="date"
            value={startDate.toISOString().split('T')[0]}
            onChange={(e) => setStartDate(new Date(e.target.value))}
          />
        </label>
        <label>
          До:
          <input
            type="date"
            value={endDate.toISOString().split('T')[0]}
            onChange={(e) => setEndDate(new Date(e.target.value))}
          />
        </label>
      </div>
      <button className="calendar-apply-button" onClick={applyFilter}>
        Применить
      </button>
    </div>
  );
};

export default CalendarPopup;
