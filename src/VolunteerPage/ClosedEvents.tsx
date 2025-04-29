import React, { useState } from 'react';
import { TimeRange, formatDateTime } from '../global_functions/Datetime_redact';
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
                    <div className='events_el_title-box'>
                        <p className='events_el_title-box_name'>{event.title}</p>
                        <div className='events_el_title-box_time'>
                            <div className='events_el_title-box_time-block'>
                                <p className=''>{formatDateTime(event.eventDate[0])}</p>
                                <p className=''>{formatDateTime(event.eventDate[1])}</p>
                            </div>
                        </div>
                    </div>
                    <p className='event-description'>{event.description}</p>
                    <p className='additional-data'> {
              event.accepted ? (
                <span>Посещаемость: {calculateTimeDifference(event.eventDate)} часов</span>) :
                (<span>Посещаемость: Отсутствовал</span>)
              }
            </p>
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
            <div className='modal-header'>
              <h2>{volunteerEvent.title}</h2>
            </div>
            <p><strong>Дата:</strong> {formatDateTime(volunteerEvent.eventDate[0])} - {formatDateTime(volunteerEvent.eventDate[1])}</p>
            <p><strong>Описание:</strong> {volunteerEvent.description}</p>
            {volunteerEvent.accepted ? (
              <p><strong>Статус:</strong> {calculateTimeDifference(volunteerEvent.eventDate)} часов</p>
            ) : (
              <p><strong>Статус:</strong> Отсутствовал</p>
            )}

            <div className='actions'>
              <button onClick={closeModal}>Понял</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClosedEvents;
