  // Добавьте этот компонент в файл Volunteer.tsx
  // PendingApplications.tsx
import React from 'react';
import { EventRequest } from '../shared/interfaces'; // Правильный путь к интерфейсам


  const  PendingApplications: React.FC<{ 
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

export default PendingApplications;