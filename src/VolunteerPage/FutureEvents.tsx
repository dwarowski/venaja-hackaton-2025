import React, { useState } from 'react';
import { TimeRange, formatDate, formatTimeRange } from './Volunteer';

interface Event {
  title: string;
  date: TimeRange;
  description: string;
  accepted: boolean;
}

interface EventsProps {
  events: Event[];
}

const FutureEvents: React.FC<EventsProps> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  const [requestedEvents, setRequestedEvents] = useState<number[]>([]);

  const openModal = (event: Event, index: number) => {
    setSelectedEvent(event);
    setSelectedEventIndex(index);
    setIsModalOpen(true);
    setIsClosing(false);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedEventIndex(null);
    }, 300);
  };

  const handleRequest = (index: number) => {
    if (!requestedEvents.includes(index)) {
      setRequestedEvents((prev) => [...prev, index]);
    }
  };

  // Вспомогательная функция для получения текста и состояния кнопки
  const getButtonState = (index: number) => {
    const event = events[index];
    const isAccepted = event.accepted;
    const hasRequested = requestedEvents.includes(index);
    let text = 'Подать заявку';

    if (isAccepted) text = 'Прянято';
    else if (hasRequested) text = 'На рассмотрении';

    return {
      text,
      disabled: isAccepted || hasRequested,
    };
  };

  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => {
          const { text, disabled } = getButtonState(index);

          return (
            <li key={index} onClick={() => openModal(event, index)}>
              <div className="event-item">
                <div className="event-content">
                  <div className="event-box">
                    <div className='volunteer__my-events_el_title-box'>
                      <p className='volunteer__my-events_el_title-box_name'>{event.title}</p>
                      <p className='volunteer__my-events_el_title-box_time'>{formatDate(event.date[0])},  {formatTimeRange(event.date)} </p>
                    </div>
                    <p className='event-description'>{event.description}</p>
                  </div>
                  <div className="button-container">
                    <button
                      className="request-paticipance volunteer__future-events_button"
                      disabled={disabled}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRequest(index);
                      }}
                    >
                      {text}
                    </button>
                  </div>
                </div>
              </div>

            </li>
          );
        })}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && selectedEvent !== null && selectedEventIndex !== null && (
        <div
          className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h1><strong>Название:</strong> {selectedEvent.title}</h1>
            <p><strong>Дата:</strong> {formatDate(selectedEvent.date[0])}</p>
            <p><strong>Время:</strong> {formatTimeRange(selectedEvent.date)}</p>
            <p><strong>Описание:</strong> {selectedEvent.description}</p>

            {/* Кнопка заявки в модалке */}
            {(() => {
              const { text, disabled } = getButtonState(selectedEventIndex);
              return (
                <button
                  className="request-paticipance"
                  disabled={disabled}
                  onClick={() => handleRequest(selectedEventIndex)}
                >
                  {text}
                </button>
              );
            })()}

            <button onClick={closeModal} style={{ marginLeft: '10px' }}>Понял</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureEvents;
