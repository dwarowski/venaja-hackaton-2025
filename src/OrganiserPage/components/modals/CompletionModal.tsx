import React, { useState } from 'react';
import { formatDate, formatDateTime } from '../../../global_functions/Datetime_redact';
// Импортируем необходимые интерфейсы
import { CompletionEvent, Attendance, Participant } from '../shared/interfaces';

// interface CompletionModalProps {
//   event: CompletionEvent;
//   onClose: () => void;
//   onConfirm: (attendances: Attendance[]) => void;
// }

const CompletionModal: React.FC<{
  event: CompletionEvent;
  onClose: () => void;
  onConfirm: (attendances: Attendance[]) => void;
}> = ({ event, onClose, onConfirm}) => {
  // Явно указываем тип для состояния
  const [attendances, setAttendances] = useState<Attendance[]>(
    event.participants.map((p: Participant) => ({
      participantId: p.id,
      isPresent: true
    }))
  );

  // Добавляем типы для параметров
  const handleCheckboxChange = (participantId: number) => {
    setAttendances((prev: Attendance[]) => 
      prev.map((att: Attendance) => 
        att.participantId === participantId 
          ? { ...att, isPresent: !att.isPresent } 
          : att
      )
    );
  };

  return (
    <div className="modal-content complitionevent-modal"
    onClick={(e) => e.stopPropagation()}>
      <div className='modal-header'>
        <h2>{event.title}</h2>
      </div>
      <p><strong>Дата:</strong> {formatDateTime(event.eventDate[0])} - {formatDateTime(event.eventDate[1])}</p>
      <div className='scrollable-table-container members'>
        <table className='completion-table'>
          <thead>
            <tr>
              <th>Участник</th>
              <th>Дата рождения</th>
              <th>Присутствие</th>
            </tr>
          </thead>
          <tbody>
          {event.participants.map((participant: Participant) => (
                <tr key={participant.id} className="">
                  <td>{participant.name} {participant.surname}</td>
                  <td>{formatDate(participant.birthDate)}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={attendances.find((a: Attendance) => 
                        a.participantId === participant.id)?.isPresent || false
                      }
                      onChange={() => handleCheckboxChange(participant.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletionModal;