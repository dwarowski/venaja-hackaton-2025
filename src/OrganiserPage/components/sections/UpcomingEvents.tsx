import React, { useState } from 'react';
import EventDetailsModal from '../modals/EventDetailsModal';
import { EventForOrganiser } from '../shared/interfaces';
import { formatDate, formatDateTime, TimeRange } from '../../../global_functions/Datetime_redact';
import { useModal } from '../../../global_functions/Modal_window'; // Импортируем useModal

const UpcomingEvents: React.FC<{ 
  events: EventForOrganiser[];
  onAcceptApplication: (eventId: number, appId: number) => void;
  onRejectApplication: (eventId: number, appId: number) => void;
}> = ({ events, onAcceptApplication, onRejectApplication }) => {
  const { isModalOpen, isClosing, selectedEvent, openModal, closeModal } = useModal();
  const OrganiserEvent = selectedEvent?.event as EventForOrganiser | null;

  // console.log(events)
  return (
    <div>
      <ul className="events-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => openModal(event, index)}>
            <div key={event.id} className="event-item">
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
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && OrganiserEvent !== null && (
          <div className={`modal-overlay ${isModalOpen ? 'open' : ''} ${isClosing ? 'closing' : ''}`}
          onClick={closeModal}>
          <EventDetailsModal
            event={OrganiserEvent}
            onClose={closeModal} // Используем closeModal из useModal
            onAccept={(appId) => onAcceptApplication(OrganiserEvent.id, appId)}
            onReject={(appId) => onRejectApplication(OrganiserEvent.id, appId)}
          />
        </div>
      )}

    </div>
  );
};

export default UpcomingEvents;
