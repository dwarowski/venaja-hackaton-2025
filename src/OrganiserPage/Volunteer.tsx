// Organizers.tsx
// VolunteerPage.tsx
import React, { useState } from 'react';
import './VolunteerPage.css';

interface Participant {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
}

interface Application {
  id: number;
  name: string;
  surname: string;
  birthDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface Event {
  id: number;
  time: string;
  description: string;
  participants: Participant[];
  applications: Application[];
  startDate: string;
  endDate: string;
}

interface EventRequest {
  id: number;
  eventTime: string;
  description: string;
  status: 'pending' | 'rejected';
  creationDate: string;
}

interface Attendance {
  participantId: number;
  isPresent: boolean;
}

interface CompletionEvent {
  id: number;
  time: string;
  description: string;
  participants: Participant[];
}

const EventDetailsModal: React.FC<{
  event: Event;
  onClose: () => void;
  onAccept: (appId: number) => void;
  onReject: (appId: number) => void;
}> = ({ event, onClose, onAccept, onReject }) => (
  <div className="modal-overlay">
    <div className="details-modal">
      <div className="modal-header">
        <h2>{event.description}</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="modal-content">
        {/* Таблица участников */}
        <div className="section">
          <h3>Участники</h3>
          <table className="participants-table">
            <thead>
              <tr>
                <th>Имя Фамилия</th>
                <th>Дата рождения</th>
              </tr>
            </thead>
            <tbody>
              {event.participants.map(participant => (
                <tr key={participant.id}>
                  <td>{participant.name} {participant.surname}</td>
                  <td>{participant.birthDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Таблица заявок */}
        <div className="section">
          <h3>Заявки на участие</h3>
          <table className="applications-table">
            <thead>
              <tr>
                <th>Имя Фамилия</th>
                <th>Дата рождения</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {event.applications.map(app => (
                <tr key={app.id}>
                  <td>{app.name} {app.surname}</td>
                  <td>{app.birthDate}</td>
                  <td>
                    <div className="actions">
                      <button 
                        className="accept-btn"
                        onClick={() => onAccept(app.id)}
                      >
                        Принять
                      </button>
                      <button 
                        className="reject-btn"
                        onClick={() => onReject(app.id)}
                      >
                        Отклонить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);

// Обновляем компонент UpcomingEvents
const UpcomingEvents: React.FC<{ 
  events: Event[];
  onAcceptApplication: (eventId: number, appId: number) => void;
  onRejectApplication: (eventId: number, appId: number) => void;
}> = ({ events, onAcceptApplication, onRejectApplication }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  return (
    <div className="events-container">
      {events.map((event) => (
        <div key={event.id} className="event-card">
          <div className="event-header">
            <div className="event-time">{event.time}</div>
            <div className="event-description">{event.description}</div>
            <button 
              className="toggle-button"
              onClick={() => setSelectedEvent(event)}
            >
              Показать участников
            </button>
          </div>
        </div>
      ))}
      
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

const NewEventForm: React.FC<{ 
  onCreate: (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => void;
  onCancel: () => void;
}> = ({ onCreate, onCancel }) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      description,
      time: `${startDate} - ${endDate}`,
      startDate,
      endDate,
    });
  };

  return (
    <div className="new-event-form">
      <h2>Новое мероприятие</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Описание:</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата и время начала:</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата и время окончания:</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-button">
            Отправить заявку
          </button>
          <button type="button" className="cancel-button" onClick={onCancel}>
            Отменить
          </button>
        </div>
      </form>
    </div>
  );
};

// Обновленный компонент NewEventForm в виде модального окна
const NewEventModal: React.FC<{ 
  onCreate: (newEvent: Omit<Event, 'id' | 'participants' | 'applications'>) => void;
  onClose: () => void;
}> = ({ onCreate, onClose }) => {
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      description,
      time: `${startDate} - ${endDate}`,
      startDate,
      endDate,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="event-modal" style={{ maxWidth: '800px' }}>
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="event-form-container">
          {/* Левая колонка */}
          <div className="form-left-column">
            <h3>Новое мероприятие</h3>
            <div className="form-section">
              <label>Описание</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Введите описание мероприятия"
                required
                className="description-textarea"
              />
            </div>
          </div>

          {/* Правая колонка */}
          <div className="form-right-column">
            <div className="time-section">
              <div className="form-section">
                <label>Дата и время начала</label>
                <input
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>

              <div className="form-section">
                <label>Дата и время окончания</label>
                <input
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="modal-actions">
              <button type="submit" className="submit-btn">
                Отправить заявку
              </button>
              <button type="button" className="cancel-btn" onClick={onClose}>
                Отменить заявку
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const VolunteerPage: React.FC = () => {
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

// Добавляем компонент для отображения мероприятий, требующих завершения
// Обновляем компонент CompletionEvents
const CompletionEvents: React.FC<{ 
  events: CompletionEvent[];
  onComplete: (id: number) => void;
}> = ({ events, onComplete }) => {
  const [selectedEvent, setSelectedEvent] = useState<CompletionEvent | null>(null);

  return (
    <div className="events-container">
      {events.map((event) => (
        <div key={event.id} className="event-card completion-card">
          <div className="event-time">{event.time}</div>
          <div className="event-description">{event.description}</div>
          <button 
            className="complete-button"
            onClick={() => setSelectedEvent(event)}
          >
            Завершить
          </button>
        </div>
      ))}
      
      {selectedEvent && (
        <CompletionModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onConfirm={(attendances) => {
            console.log('Attendance data:', attendances);
            onComplete(selectedEvent.id);
            setSelectedEvent(null);
          }}
        />
      )}
    </div>
  );
};


// Добавляем интерфейс для состояния присутствия участников
interface Attendance {
  participantId: number;
  isPresent: boolean;
}

// Обновляем интерфейс CompletionEvent
interface CompletionEvent {
  id: number;
  time: string;
  description: string;
  participants: Participant[];
}

// Добавляем компонент модального окна
const CompletionModal: React.FC<{
  event: CompletionEvent;
  onClose: () => void;
  onConfirm: (attendances: Attendance[]) => void;
}> = ({ event, onClose, onConfirm }) => {
  const [attendances, setAttendances] = useState<Attendance[]>(
    event.participants.map(p => ({
      participantId: p.id,
      isPresent: true // По умолчанию присутствует
    }))
  );

  const handleCheckboxChange = (participantId: number) => {
    setAttendances(prev => 
      prev.map(att => 
        att.participantId === participantId 
          ? { ...att, isPresent: !att.isPresent } 
          : att
      )
    );
  };

  return (
    <div className="modal-overlay">
      <div className="completion-modal">
        <h2>Завершение мероприятия</h2>
        
        <div className="participants-list">
          <div className="table-header">
            <span>Участник</span>
            <span>Дата рождения</span>
            <span>Присутствие</span>
          </div>
          
          {event.participants.map(participant => (
            <div key={participant.id} className="participant-row">
              <div>{participant.name} {participant.surname}</div>
              <div>{participant.birthDate}</div>
              <input
                type="checkbox"
                checked={attendances.find(a => a.participantId === participant.id)?.isPresent || false}
                onChange={() => handleCheckboxChange(participant.id)}
              />
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Отмена
          </button>
          <button 
            className="confirm-button" 
            onClick={() => onConfirm(attendances)}
          >
            Подтвердить завершение
          </button>
        </div>
      </div>
    </div>
  );
};


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

  
  // В компоненте VolunteerPage добавьте обработчик:
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

export default VolunteerPage;