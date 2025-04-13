import React from 'react';
import { Event, Application, Participant } from '../shared/interfaces';
import '../../Organiser.css';

const EventDetailsModal: React.FC<{
  event: Event;
  onClose: () => void;
  onAccept: (appId: number) => void;
  onReject: (appId: number) => void;
}> = ({ event, onClose, onAccept, onReject }) => (
  <div className="modal-overlay">
    <div className="details-modal">
      <div className="modal-header">S
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

export default EventDetailsModal;