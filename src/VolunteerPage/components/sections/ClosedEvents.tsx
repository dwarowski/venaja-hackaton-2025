import React, { useState } from 'react';
import { TimeRange, formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';
import { EventForVolunteer, EventsProps } from '../shared/interfaces';
import { useModal } from '../../../global_functions/Modal_window';
import CloseModal from '../modals/CloseModal';

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
                    <p className='additional-data'>
                      <span>
                          Дата создания: {formatDate(event.creationDate)}
                      </span>
                      {
                      event.accepted ? (
                        <span> Посещаемость: {calculateTimeDifference(event.eventDate)} часов</span>) :
                        (<span> Посещаемость: Отсутствовал</span>)
                      }
                    </p>
                  </div>
            </li>
          );
        })}
      </ul>

      <CloseModal
        isOpen={isModalOpen}
        isClosing={isClosing}
        event={volunteerEvent}
        onClose={closeModal}
        calculateTimeDifference={calculateTimeDifference}
      />
    </div>
  );
};

export default ClosedEvents;
