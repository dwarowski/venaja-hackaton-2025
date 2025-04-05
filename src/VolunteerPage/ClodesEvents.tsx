import React from 'react';

interface Event {
  title: string;
  date: string;
  time: string;
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
            <h3>{event.title}</h3>
            <p>{event.date}</p>
            <p>{event.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FutureEvents;
