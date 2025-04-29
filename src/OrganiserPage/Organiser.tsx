import React, { useState, useRef } from 'react';
import UpcomingEvents from './components/sections/UpcomingEvents';
import PendingApplications from './components/sections/PendingApplications';
import NewEventModal from './components/modals/NewEventModal';
import CompletionEvents from './components/sections/CompletionEvents';
import { 
  EventForOrganiser, 
  Application, 
  CompletionEvent,
  EventRequest 
} from './components/shared/interfaces';
import { TimeRange} from '../global_functions/Datetime_redact';

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
  const [events, setEvents] = useState<EventForOrganiser[]>([
    {
      id: 1,
      title: 'IT-волонтерство для начинающих',
      description: 'IT-волонтерство для начинающихfaghsjkl;asassa',
      eventDate: [new Date('2023-12-01T10:00:00'), new Date('2023-12-01T12:00:00')] as TimeRange,
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 3, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 4, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 5, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 6, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 7, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 8, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 9, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 10, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') }
      ],
      applications: [
        { 
          id: 1, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 2, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 3, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 4, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 5, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 6, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 7, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        },
        { 
          id: 8, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: new Date('1995-03-10'),
          status: 'pending'
        }
      ]
    },
    {
      id: 2,
      title: 'IT-ХИ-ХИ для начинающих',
      description: 'IT-ХИ-ХИ для начинающих fuhuhuhuhu',
      eventDate: [new Date('2023-12-01T14:00:00'), new Date('2023-12-01T16:00:00')] as TimeRange,
      participants: [
        { id: 1, name: 'Иван', surname: 'Запара', birthDate: new Date('1990-05-15') },
        { id: 2, name: 'Запар', surname: 'Ива', birthDate: new Date('1985-08-22') }
      ],
      applications: [
        { 
          id: 1, 
          name: 'ИИИИИИВАААААААН', 
          surname: 'ЗАПААААААААРА', 
          birthDate: new Date('1995-03-10'),
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
      birthDate: new Date("1998-12-05"),
      status: "pending",
    },
    {
      id: 2,
      name: "Дмитрий",
      surname: "Соколов",
      birthDate: new Date("2001-07-22"),
      status: "pending",
    },
    {
      id: 3,
      name: "Анна",
      surname: "Кузнецова",
      birthDate: new Date("1995-03-14"),
      status: "pending",
    },
    {
      id: 4,
      name: "Иван",
      surname: "Петров",
      birthDate: new Date("1989-09-30"),
      status: "pending",
    },
  ]);
  
  const [completionEvents, setCompletionEvents] = useState<CompletionEvent[]>([
    {
      id: 1,
      eventDate: [new Date('2023-12-01T10:00:00'), new Date('2023-12-01T12:00:00')] as TimeRange,
      title: 'IT-волонтерство для начинающих',
      description: 'IT-волонтерство для начинающихописание',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date("1990-05-15") },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date("1985-08-22") }
      ]
    },
    {
      id: 2,
      eventDate: [new Date('2023-12-01T14:00:00'), new Date('2023-12-01T14:00:00')] as TimeRange,
      title: 'IT-ХИ-ХИ для ха-ха',
      description: 'IT-ХИ-ХИ для ха-ха',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 3, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 4, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 5, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 6, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 7, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 8, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 9, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 10, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') },
        { id: 11, name: 'Иван', surname: 'Иванов', birthDate: new Date('1990-05-15') },
        { id: 12, name: 'Мария', surname: 'Петрова', birthDate: new Date('1985-08-22') }
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

  const handleCreateEvent = (newEvent: Omit<EventForOrganiser, 'id' | 'participants' | 'applications'>) => {
    setEvents([...events, {
      ...newEvent,
      id: Date.now(),
      participants: [],
      applications: []
    }]);
  };


const [eventRequests, setEventRequests] = useState<EventRequest[]>([
  {
    id: 1,
    eventDate: [new Date('2023-12-01T10:00'), new Date('2023-12-01T12:00')] as TimeRange,
    title: 'IT-волонтерство для начинающих',
    description: 'IT-волонтерство для начинающихasasasasasas',
    status: 'pending',
    creationDate: new Date('01.12.2023')
  },
  {
    id: 2,
    eventDate: [new Date('2023-12-01T14:00'), new Date('2023-12-01T16:00')] as TimeRange,
    description: 'Обучение цифровой грамотностиasfsaaad',
    title: 'Обучение цифровой грамотности',
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
              <UpcomingEvents 
                events={events}
                onAcceptApplication={handleAcceptApplication}
                onRejectApplication={handleRejectApplication}
              />
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