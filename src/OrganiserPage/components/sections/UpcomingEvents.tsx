import React, { useState } from 'react';
import EventDetailsModal from '../modals/EventDetailsModal';
import { Event } from '../shared/interfaces';
import {formatDate, formatTimeRange, TimeRange} from '../../../global_functions/Datetime_redact';

const UpcomingEvents: React.FC<{ 
  events: Event[];
  onAcceptApplication: (eventId: number, appId: number) => void;
  onRejectApplication: (eventId: number, appId: number) => void;
}> = ({ events, onAcceptApplication, onRejectApplication }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showNewEventForm, setShowNewEventForm] = useState(false);

  return (
    <div>
      <ul className = "events-list">
        {events.map((event, index) => (
          <li key={index} onClick={() => setSelectedEvent(event)}>
            <div key={event.id} className="event-item">
              <div className="volunteer__my-events_el_title-box">
                <p className="volunteer__my-events_el_title-box_name">{event.title}</p>
                <p className="volunteer__my-events_el_title-box_time">{formatDate(event.eventDate[0])},  {formatTimeRange(event.eventDate)}</p>
              </div>
              <p className='event-description'>{event.description}</p>
            </div>
          </li>
          ))}
      </ul>     
      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onAccept={(appId) => onAcceptApplication(selectedEvent.id, appId)}
          onReject={(appId) => onRejectApplication(selectedEvent.id, appId)}
        />
      )}
    </div>


  );
};

export default UpcomingEvents;