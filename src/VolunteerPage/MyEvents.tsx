import React from 'react';

interface Event {
  title: string;
  date: string;
  time: string;
  description: string;
}

interface EventsProps {
  events: Event[];
}

const FutureEvents: React.FC<EventsProps> = ({ events }) => {
  return (
    <ul className="events-list">
      {events.map((event, index) => (
        <li key={index}>
          <div className="event-item">
            <div className='main-info'>
              <h1>{event.title}</h1>
              <p>{event.date}</p>
              <p>{event.time}</p>
            </div>
            <p className='event-description'> {event.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FutureEvents;
