import React, { useState } from 'react';
import { TimeRange, formatDate, formatTimeRange } from './Volunteer';

// Интерфейс для события
interface Event {
  title: string;
  date: TimeRange;
  description: string;
  accepted: boolean;
}

interface EventsProps {
  events: Event[];
}

// Компонент для отображения списка событий
const FutureEvents: React.FC<EventsProps> = ({ events }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);

  const [requestedEvents, setRequestedEvents] = useState<number[]>([]);

  // Открытие модального окна
  const openModal = (event: Event, index: number) => {
    setSelectedEvent(event);
    setSelectedEventIndex(index);
    setIsModalOpen(true);
    setIsClosing(false);
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setSelectedEvent(null);
      setSelectedEventIndex(null);
    }, 300);
  };

  // Обработка запроса на участие в мероприятии
  const handleRequest = (index: number) => {
    if (!requestedEvents.includes(index)) {
      setRequestedEvents((prev) => [...prev, index]);
    }
  };

  // Функция для расчета разницы во времени
  const calculateTimeDifference = (timeRange: TimeRange): number => {
    const [start, end] = timeRange;
    const diffMs = end.getTime() - start.getTime();
    return diffMs / (1000 * 60 * 60); // Разница в часах
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
                    <div className="main-info">
                      <h1>{event.title}</h1>
                      <p>{formatDate(event.date[0])}</p>
                      <p>{formatTimeRange(event.date)}</p>
                    </div>
                    <p className="event-description">{event.description}</p>
                  </div>
                  <div className="button-container">
                    {/* Здесь выводим либо текст "Отсутствовал", либо разницу во времени */}
                    {event.accepted ? (
                      <p className="text-inactive">+ {calculateTimeDifference(event.date)} часов</p>
                    ) : (
                      <p className="text-inactive">Отсутствовал</p>
                    )}
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

            {selectedEvent.accepted ? (
              <p><strong>Статус:</strong> {calculateTimeDifference(selectedEvent.date)} часов</p>
            ) : (
              <p><strong>Статус:</strong> Отсутствовал</p>
            )}

            <button onClick={closeModal} style={{ marginLeft: '10px' }}>Понял</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FutureEvents;
