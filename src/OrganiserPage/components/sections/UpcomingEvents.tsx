import React, { useState } from 'react';
import EventDetailsModal from '../modals/EventDetailsModal';
import { Event } from '../shared/interfaces';

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
            <div key={event.id} className="event-card">
              <div className="event-header">
                <div className="event-time">{event.time}</div>
                <div className="event-description">{event.description}</div>
              </div>
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