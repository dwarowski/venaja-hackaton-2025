import React, { useState } from 'react';
// Импортируем необходимые интерфейсы
import { CompletionEvent, Attendance, Participant } from '../shared/interfaces';

interface CompletionModalProps {
  event: CompletionEvent;
  onClose: () => void;
  onConfirm: (attendances: Attendance[]) => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ 
  event, 
  onClose, 
  onConfirm 
}) => {
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
    <div className="modal-overlay">
      <div className="completion-modal">
        <h2>Завершение мероприятия</h2>
        
        <div className="participants-list">
          <div className="table-header">
            <span>Участник</span>
            <span>Дата рождения</span>
            <span>Присутствие</span>
          </div>
          
          {event.participants.map((participant: Participant) => (
            <div key={participant.id} className="participant-row">
              <div>{participant.name} {participant.surname}</div>
              <div>{participant.birthDate}</div>
              <input
                type="checkbox"
                checked={attendances.find((a: Attendance) => 
                  a.participantId === participant.id)?.isPresent || false
                }
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

export default CompletionModal;