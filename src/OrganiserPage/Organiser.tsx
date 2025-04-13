import React, { useState, useRef } from 'react';
import UpcomingEvents from './components/sections/UpcomingEvents';
import NewEventModal from './components/modals/NewEventModal';
import CompletionEvents from './components/sections/CompletionEvents';
import { 
  Event, 
  Application, 
  CompletionEvent,
  EventRequest 
} from './components/shared/interfaces';
import { TimeRange, formatDate, formatTimeRange } from '../global_functions/Datetime_redact';




const OrganiserPage: React.FC = () => {
  const tabsRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: -150, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (tabsRef.current) {
      tabsRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completion'>('upcoming');
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: 'IT-волонтерство для начинающих',
      description: 'IT-волонтерство для начинающихfaghsjkl;asassa',
      eventDate: [new Date('2023-12-01T10:00'), new Date('2023-12-01T12:00')] as TimeRange,
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date('15.05.1990') },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date('22.08.1985') }
      ],
      applications: [
        { 
          id: 1, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('10.03.1995'),
          status: 'pending'
        }
      ]
    },
    {
      id: 2,
      title: 'IT-ХИ-ХИ для начинающих',
      description: 'IT-ХИ-ХИ для начинающих fuhuhuhuhu',
      eventDate: [new Date('2023-12-01T14:00'), new Date('2023-12-01T16:00')] as TimeRange,
      participants: [
        { id: 1, name: 'Иван', surname: 'Запара', birthDate: new Date('15.05.1990') },
        { id: 2, name: 'Запар', surname: 'Ива', birthDate: new Date('22.08.1985') }
      ],
      applications: [
        { 
          id: 1, 
          name: 'ИИИИИИВАААААААН', 
          surname: 'ЗАПААААААААРА', 
          birthDate: new Date('10.03.1995'),
          status: 'pending'
        }
      ]
    }
  ]);
  const [pendingApps, setPendingApps] = useState<Application[]>([
    {
      id: 1,
      name: "Ольга",
      surname: "Иванова",
      birthDate: new Date("05.12.1998"),
      status: "pending",
    },
    {
      id: 2,
      name: "Дмитрий",
      surname: "Соколов",
      birthDate: new Date("22.07.2001"),
      status: "pending",
    },
    {
      id: 3,
      name: "Анна",
      surname: "Кузнецова",
      birthDate: new Date("14.03.1995"),
      status: "pending",
    },
    {
      id: 4,
      name: "Иван",
      surname: "Петров",
      birthDate: new Date("30.09.1989"),
      status: "pending",
    },
  ]);
  const [completionEvents, setCompletionEvents] = useState<CompletionEvent[]>([
    {
      id: 1,
      eventTime: [new Date('2023-12-01T10:00'), new Date('2023-12-01T12:00')] as TimeRange,
      description: 'IT-волонтерство для начинающих',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date('15.05.1990') },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date('22.08.1985') }
      ]
    },
    {
      id: 2,
      eventTime: [new Date('2023-12-01T14:00'), new Date('2023-12-01T14:00')] as TimeRange,
      description: 'IT-ХИ-ХИ для ха-ха',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date('15.05.1990') },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date('22.08.1985') }
      ]
    },
  ]);
  const [showNewEventForm, setShowNewEventForm] = useState(false);


  const handleAcceptApplication = (eventId: number, appId: number) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          applications: event.applications.filter(app => app.id !== appId),
          participants: [
            ...event.participants,
            event.applications.find(app => app.id === appId)!
          ]
        };
      }
      return event;
    }));
  };

  const handleCompleteEvent = (eventId: number) => {
    setCompletionEvents(completionEvents.filter(e => e.id !== eventId));
  };

  const handleRejectApplication = (eventId: number, appId: number) => {
    setEvents(events.map(event => {
      if (event.id === eventId) {
        return {
          ...event,
          applications: event.applications.map(app => 
            app.id === appId ? { ...app, status: 'rejected' } : app
          )
        };
      }
      return event;
    }));
  };

  const handleCreateEvent = (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => {
    setEvents([...events, {
      ...newEvent,
      id: Date.now(),
      participants: [],
      applications: []
    }]);
  };

  const PendingApplications: React.FC<{ 
  requests: EventRequest[];
  onDelete: (id: number) => void;
}> = ({ requests, onDelete }) => (
  <div className="applications-container">
    {requests.map((request) => (
      <div key={request.id} className="application-card">
        <div className="event-time">{formatTimeRange(request.eventTime)}</div>
        <div className="event-description">{request.description}</div>
        <div className="application-status-row">
          <span className={`status-indicator ${request.status}`}>
            Статус: {request.status === 'pending' 
              ? 'На рассмотрении' 
              : 'Отклонено'}
          </span>
          <div className="request-actions">
            <span className="request-date">
              {formatDate(request.creationDate)}
            </span>
            <button 
              className="delete-button"
              onClick={() => onDelete(request.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const [eventRequests, setEventRequests] = useState<EventRequest[]>([
  {
    id: 1,
    eventTime: [new Date('2023-12-01T10:00'), new Date('2023-12-01T12:00')] as TimeRange,
    description: 'IT-волонтерство для начинающих',
    status: 'pending',
    creationDate: new Date('01.12.2023')
  },
  {
    id: 2,
    eventTime: [new Date('2023-12-01T14:00'), new Date('2023-12-01T16:00')] as TimeRange,
    description: 'Обучение цифровой грамотности',
    status: 'rejected',
    creationDate: new Date('02.12.2023')
  }
]);

  
  const handleDeleteRequest = (requestId: number) => {
    setEventRequests(eventRequests.filter(r => r.id !== requestId));
  };
  
  return (
    <div className="parent">
      <div className="tabs-row">
        <button className="scroll-button left" onClick={scrollLeft}>←</button>

        <div className="tabs-container" ref={tabsRef}>
          <button
            className={`tab-button ${activeTab === 'upcoming' ? 'button-active' : 'button-inactive'}`}
            onClick={() => {
              setActiveTab('upcoming');
              setShowNewEventForm(false);
            }}
          >
            Предстоящие мероприятия
          </button>
          <button
            className={`tab-button ${activeTab === 'pending' ? 'button-active' : 'button-inactive'}`}
            onClick={() => {setActiveTab('pending'); setShowNewEventForm(false);}}
          >
            Заявки на рассмотрении
          </button>
          <button
            className={`tab-button ${activeTab === 'completion' ? 'button-active' : 'button-inactive'}`}
            onClick={() => {setActiveTab('completion'); setShowNewEventForm(false);}}
          >
            Требующие завершения
          </button>
          <button
              className={`tab-button ${showNewEventForm ? 'button-active' : 'button-inactive'}`}
              onClick={() => setShowNewEventForm(true)
            }
          >
            Подать заявку на новое мероприятие
          </button>
        </div>
        <button className="scroll-button right" onClick={scrollRight}>→</button>
      </div>


      <div className="child">
        <div className='EventsList'>
      {activeTab === 'upcoming' && (
        <>
          <UpcomingEvents 
            events={events}
            onAcceptApplication={handleAcceptApplication}
            onRejectApplication={handleRejectApplication}
          />
        </>

      )}

      {activeTab === 'pending' && (
        <PendingApplications 
          requests={eventRequests}
          onDelete={handleDeleteRequest}
        />
      )}

      {activeTab === 'completion' && (
        <CompletionEvents 
          events={completionEvents}
          onComplete={handleCompleteEvent}
        />
      )}
      {showNewEventForm && (
        <NewEventModal
          onCreate={handleCreateEvent}
          onClose={() => setShowNewEventForm(false)}
        />
      )}
</div>


    </div>
    </div>
  );
};

export default OrganiserPage;