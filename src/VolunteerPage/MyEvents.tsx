import React, { useState } from 'react';
import { TimeRange, formatDate, formatTimeRange } from '../global_functions/Datetime_redact';
import { useModal } from '../global_functions/Modal_window';
import { EventForVolunteer } from './Volunteer';

interface EventsProps {
  events: EventForVolunteer[];
}


const MyEvents: React.FC<EventsProps> = ({ events }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  console.log('События в MyEvents:', events);

  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => openModal(event, index)}>
            <div className="event-item">
              <div className='events_el_title-box'>
                <p className='events_el_title-box_name'>{event.title}</p>
                <p className='events_el_title-box_time'>{formatDate(event.eventDate[0])},  {formatTimeRange(event.eventDate)} </p>
              </div>
              <p className='event-description'>{event.description}</p>
            </div>
          </li>
        ))}
      </ul>

      {/* Модальное окно */}
      {isModalOpen && selectedEvent && (
        <div
          className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}
        >
          <div className="modal-content volunteers-modal" onClick={(e) => e.stopPropagation()}>
            <h1><strong>Название:</strong> {selectedEvent.event.title}</h1>
            <p><strong>Дата:</strong> {formatDate(selectedEvent.event.eventDate[0])}</p>
            <p><strong>Время:</strong> {formatTimeRange(selectedEvent.event.eventDate)}</p>
            <p><strong>Описание:</strong> {selectedEvent.event.description}</p>
            <button onClick={closeModal}>Понял</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyEvents;
