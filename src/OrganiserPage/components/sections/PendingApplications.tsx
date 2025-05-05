  // Добавьте этот компонент в файл Volunteer.tsx
  // PendingApplications.tsx
import React from 'react';
import { EventRequest } from '../shared/interfaces'; // Правильный путь к интерфейсам
import { formatDateTime, formatDate } from '../../../global_functions/Datetime_redact';

  const PendingApplications: React.FC<{ 
  requests: EventRequest[];
  onDelete: (id: number) => void;
}> = ({ requests, onDelete }) => {
  return (
    <div>
      <ul className='events-list'>
        {requests.map((request) => {
          return (
            <li key={request.id}>
              <div className='event-item'>
                <div className='event-content'>
                  <div className='event-box'>
                    <div className='events_el_title-box'>
                        <p className='events_el_title-box_name'>{request.title}</p>
                        <div className='events_el_title-box_time'>
                            <div className='events_el_title-box_time-block'>
                                <p className=''>{formatDateTime(request.eventDate[0])}</p>
                                <p className=''>{formatDateTime(request.eventDate[1])}</p>
                            </div>
                        </div>
                    </div>
                    <p className='event-description'>{request.description}</p>
                    <p className='additional-data'>
                      <span>
                         Дата создания: {formatDate(request.creationDate) + " "}
                      </span>
                      <span>
                        Статус: {request.status === 'pending' ? 'На рассмотрении' : 'Отклонено'}
                      </span>
                    </p>
                  </div>
                  <div className="button-container">
                    <button
                        className="request-paticipance volunteer__future-events_button"
                        onClick={() => onDelete(request.id)}
                    >
                        Удалить
                    </button>
                    </div>
                </div>
              </div>
            </li>
          )
})}
      </ul>
    </div>
  );
}

export default PendingApplications;