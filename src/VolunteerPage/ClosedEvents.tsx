import React, { useState } from 'react';
import { TimeRange, formatDate, formatTimeRange } from '../global_functions/Datetime_redact';
import { EventForVolunteer } from './Volunteer';
import { useModal } from '../global_functions/Modal_window';

interface EventsProps {
  events: EventForVolunteer[];
}

// Компонент для отображения списка событий
const ClosedEvents: React.FC<EventsProps> = ({ events }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  const volunteerEvent = selectedEvent?.event as EventForVolunteer | null;


  const [requestedEvents, setRequestedEvents] = useState<number[]>([]);

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
          return (
            <li key={index} onClick={() => openModal(event, index)}>
              <div className="event-item">
                <div className="event-content">
                  <div className="event-box">
                    <div className='events_el_title-box'>
                      <p className='events_el_title-box_name'>{event.title}</p>
                      <p className='events_el_title-box_time'>{formatDate(event.eventDate[0])}, {formatTimeRange(event.eventDate)} </p>
                    </div>
                    <p className='event-description'>{event.description}</p>
                  </div>
                  <div className="button-container">
                    {event.accepted ? (
                      <p className="text-inactive volunteer__future-events_button">+ {calculateTimeDifference(event.eventDate)} часов</p>
                    ) : (
                      <p className="text-inactive volunteer__future-events_button">Отсутствовал</p>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && volunteerEvent !== null && (
        <div
          className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
        >
          <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
            <h1><strong>Название:</strong> {volunteerEvent.title}</h1>
            <p><strong>Дата:</strong> {formatDate(volunteerEvent.eventDate?.[0])}</p>
            <p><strong>Время:</strong> {formatTimeRange(volunteerEvent.eventDate)}</p>
            <p><strong>Описание:</strong> {volunteerEvent.description}</p>

            {volunteerEvent.accepted ? (
              <p><strong>Статус:</strong> {calculateTimeDifference(volunteerEvent.eventDate)} часов</p>
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

export default ClosedEvents;
