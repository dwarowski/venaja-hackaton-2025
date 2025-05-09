import React from 'react';
import { formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';
import { EventsProps } from '../shared/interfaces';
import { useModal } from '../../../global_functions/Modal_window';
import CurrentModal from '../modals/CurrentModal';

const MyEvents: React.FC<EventsProps> = ({ events }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  // console.log(events);

  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => (
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
              </p>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && selectedEvent && (
        <CurrentModal
          event={selectedEvent.event}
          isOpen={isModalOpen}
          isClosing={isClosing}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default MyEvents;
