// Organizers.tsx
// OrganiserPage.tsx
import React, { useState } from 'react';
import UpcomingEvents from './pages/components/sections/UpcomingEvents';
import NewEventModal from './components/modals/NewEventModal';
import CompletionModal from './components/modals/CompletionModal';
//import PendingApplications from '../components/sections/PendingApplications';
import CompletionEvents from './components/sections/CompletionEvents';
import { 
  Event, 
  Application, 
  CompletionEvent,
  EventRequest 
} from './components/shared/interfaces';
import './VolunteerPage.css';


const OrganiserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'pending' | 'completion'>('upcoming');
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      time: '10:00 — 12:00',
      description: 'IT-волонтерство для начинающих',
      startDate: '2023-12-01T10:00',
      endDate: '2023-12-01T12:00',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: '15.05.1990' },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: '22.08.1985' }
      ],
      applications: [
        { 
          id: 1, 
          name: 'Алексей', 
          surname: 'Смирнов', 
          birthDate: '10.03.1995',
          status: 'pending'
        }
      ]
    },
    {
      id: 2,
      time: '14:00 — 16:00',
      description: 'IT-ХИ-ХИ для начинающих',
      startDate: '2023-12-01T10:00',
      endDate: '2023-12-01T12:00',
      participants: [
        { id: 1, name: 'Иван', surname: 'Запара', birthDate: '15.05.1990' },
        { id: 2, name: 'Запар', surname: 'Ива', birthDate: '22.08.1985' }
      ],
      applications: [
        { 
          id: 1, 
          name: 'ИИИИИИВАААААААН', 
          surname: 'ЗАПААААААААРА', 
          birthDate: '10.03.1995',
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
      birthDate: "05.12.1998",
      status: "pending",
    },
    {
      id: 2,
      name: "Дмитрий",
      surname: "Соколов",
      birthDate: "22.07.2001",
      status: "pending",
    },
    {
      id: 3,
      name: "Анна",
      surname: "Кузнецова",
      birthDate: "14.03.1995",
      status: "pending",
    },
    {
      id: 4,
      name: "Иван",
      surname: "Петров",
      birthDate: "30.09.1989",
      status: "pending",
    },
  ]);

  
  const [completionEvents, setCompletionEvents] = useState<CompletionEvent[]>([
    {
      id: 1,
      time: '10:00 — 12:00',
      description: 'IT-волонтерство для начинающих',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: '15.05.1990' },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: '22.08.1985' }
      ]
    },
    {
      id: 2,
      time: '12:00 — 14:00',
      description: 'IT-ХИ-ХИ для ха-ха',
      participants: [
        { id: 1, name: 'Иван', surname: 'Иванов', birthDate: '15.05.1990' },
        { id: 2, name: 'Мария', surname: 'Петрова', birthDate: '22.08.1985' }
      ]
    },
    // ... другие мероприятия
  ]);

  

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
    setShowNewEventForm(false);
  };

  // Добавьте этот компонент в файл Volunteer.tsx
  const PendingApplications: React.FC<{ 
  requests: EventRequest[];
  onDelete: (id: number) => void;
}> = ({ requests, onDelete }) => (
  <div className="applications-container">
    {requests.map((request) => (
      <div key={request.id} className="application-card">
        <div className="event-time">{request.eventTime}</div>
        <div className="event-description">{request.description}</div>
        <div className="application-status-row">
          <span className={`status-indicator ${request.status}`}>
            Статус: {request.status === 'pending' 
              ? 'На рассмотрении' 
              : 'Отклонено'}
          </span>
          <div className="request-actions">
            <span className="request-date">
              {request.creationDate}
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
    eventTime: '10:00 — 12:00',
    description: 'IT-волонтерство для начинающих',
    status: 'pending',
    creationDate: '01.12.2023'
  },
  {
    id: 2,
    eventTime: '14:00 — 16:00',
    description: 'Обучение цифровой грамотности',
    status: 'rejected',
    creationDate: '02.12.2023'
  }
]);

  
  // В компоненте OrganiserPage добавьте обработчик:
  const handleDeleteRequest = (requestId: number) => {
    setEventRequests(eventRequests.filter(r => r.id !== requestId));
  };
  
 

  return (
    <div className="volunteer-page">
      <div className="tabs-container">
        <button
          className={`tab-button ${activeTab === 'upcoming' ? 'active' : ''}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Предстоящие мероприятия
        </button>
        <button
          className={`tab-button ${activeTab === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveTab('pending')}
        >
          Заявки на рассмотрении
        </button>
        <button
          className={`tab-button ${activeTab === 'completion' ? 'active' : ''}`}
          onClick={() => setActiveTab('completion')}
        >
          Требующие завершения
        </button>
      </div>

      <div className="content-area">
      {activeTab === 'upcoming' && (
        <>
          <UpcomingEvents 
            events={events}
            onAcceptApplication={handleAcceptApplication}
            onRejectApplication={handleRejectApplication}
          />
          <button 
            className="new-application-button"
            onClick={() => setShowNewEventForm(true)}
          >
            Подать заявку на новое мероприятие
          </button>
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

      {/* Модальное окно для новой заявки */}
      {showNewEventForm && (
        <NewEventModal
          onCreate={handleCreateEvent}
          onClose={() => setShowNewEventForm(false)}
        />
      )}
    </div>
    </div>
  );
};

export default OrganiserPage;