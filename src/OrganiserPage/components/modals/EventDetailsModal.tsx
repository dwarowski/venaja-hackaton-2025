  import React, { useState } from 'react';
  import { Application, Participant, EventForOrganiser } from '../shared/interfaces';
  import '../../Organiser.css';
  import { formatDate } from '../../../global_functions/Datetime_redact';

  const EventDetailsModal: React.FC<{
    event: EventForOrganiser;
    onClose: () => void;
    onAccept: (appId: number) => void;
    onReject: (appId: number) => void;
  }> = ({ event, onClose, onAccept, onReject }) => {
    const [applications, setApplications] = useState<Application[]>(event.applications);
    const [participants, setParticipants] = useState<Participant[]>(event.participants);

    const handleAccept = (appId: number) => {
      const acceptedApp = applications.find(app => app.id === appId);
      if (!acceptedApp) return;

      onAccept(appId);

      const newParticipant: Participant = {
        id: participants.length + 1, // генерируем id (в проде лучше сервер делает это)
        name: acceptedApp.name,
        surname: acceptedApp.surname,
        birthDate: acceptedApp.birthDate,
      };

      setParticipants(prev => [...prev, newParticipant]);
      setApplications(prev => prev.filter(app => app.id !== appId));
    };

    const handleReject = (appId: number) => {
      onReject(appId);
      setApplications(prev => prev.filter(app => app.id !== appId));
    };

    return (
      <div className="modal-content futureevent-modal">
        <div className="details-modal">
          <div className="modal-header">
            <h2>{event.description}</h2>
          </div>

          <div className="modal-content">
            {/* Таблица участников */}
            <div className="section">
              <h3>Участники</h3>
              <div className="scrollable-table-container members">
                <table className="participants-table">
                  <thead>
                    <tr>
                      <th>Ф.И.О</th>
                      <th>Дата рождения</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map(participant => (
                      <tr key={participant.id}>
                        <td>{participant.name} {participant.surname}</td>
                        <td>{formatDate(participant.birthDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Таблица заявок */}
            <div className="section">
              <h3>Заявки на участие</h3>
              <div className="scrollable-table-container application">
                <table className="applications-table">
                  <thead>
                    <tr>
                      <th>Ф.И.О</th>
                      <th>Дата рождения</th>
                      <th>Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications.map(app => (
                      <tr key={app.id}>
                        <td>{app.name} {app.surname}</td>
                        <td>{formatDate(app.birthDate)}</td>
                        <td>
                          <div className="actions">
                            <button 
                              className="accept-btn"
                              onClick={() => handleAccept(app.id)}
                            >
                              Принять
                            </button>
                            <button 
                              className="reject-btn"
                              onClick={() => handleReject(app.id)}
                            >
                              Отклонить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={3} style={{ textAlign: 'center', padding: '1rem' }}>
                          Нет заявок
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <button onClick={onClose}>Понял</button>
      </div>
    );
  };

  export default EventDetailsModal;
