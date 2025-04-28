// Добавляем компонент для отображения мероприятий, требующих завершения
// Обновляем компонент CompletionEvents

// CompletionEvents.tsx
import React, { useState } from 'react';
import CompletionModal from '../modals/CompletionModal';
import { formatDate, formatTimeRange, TimeRange } from '../../../global_functions/Datetime_redact'; 
import { CompletionEvent, Participant, Attendance } from '../shared/interfaces'; // Импорт интерфейсо
const CompletionEvents: React.FC<{ 
  events: CompletionEvent[];
  onComplete: (id: number) => void;
}> = ({ events, onComplete }) => {
  const [selectedEvent, setSelectedEvent] = useState<CompletionEvent | null>(null);

  return (
    <div className="events-container">
      {events.map((event) => (
        <div key={event.id} className="event-card completion-card">
          <div className="event-time">{formatTimeRange(event.eventDate)}</div>
          <div className="event-description">{event.description}</div>
          <button 
            className="complete-button"
            onClick={() => setSelectedEvent(event)}
          >
            Завершить
          </button>
        </div>
      ))}
      
      {selectedEvent && (
        <CompletionModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onConfirm={(attendances) => {
            console.log('Attendance data:', attendances);
            onComplete(selectedEvent.id);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};
export default CompletionEvents;