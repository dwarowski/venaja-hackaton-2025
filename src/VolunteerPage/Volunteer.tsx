import React, { useState } from 'react';
import './Volunteers.css';
import MyEvents from './MyEvents';
import FutureEvents from './FutureEvents';
import ClodesEvents from './ClodesEvents';

type Tab = 'my' | 'future' | 'past';

const Volunteer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('my');

//Скрипт 
// в events нужно добавить графу описание, но в обычке оторажать только ограниченное кол-во описания. Для всех событий поля одни и теже
  const events = [
    { title: 'Подписка на конференцию', date: '2023-10-01', time: '10:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    { title: 'Мастер-класс по React', date: '2023-10-02', time: '11:00 AM', description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc feugiat, enim eu mattis finibus, risus nisi rutrum tortor, nec dignissim tellus mauris quis orci. Praesent vitae dui at nulla ultricies vulputate vel a felis. Cras elit dolor, tristique sed dictum ac, porttitor id nisi. Sed ac semper erat. Integer at." },
    
    // Добавьте больше мероприятий
  ];

  return (
    <div className="parent">
      <div className="child buttons">
        <button
          className={`button ${activeTab === 'my' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('my')}
        >
          <p>Мои события</p>
        </button>
        <button
          className={`button ${activeTab === 'future' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('future')}
        >
          <p>Будущие события</p>
        </button>

        <button
          className={`button ${activeTab === 'past' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('past')}
        >
          <p>Завершенные события</p>
        </button>
      </div>
      <div className="child">
        <div className="EventsList">
          {activeTab === 'my' && <MyEvents events={events} />}
          {activeTab === 'future' && <FutureEvents events={events} />}
          {activeTab === 'past' && <ClodesEvents events={events} />}
        </div> 
      </div>
    </div>
  );
};

export default Volunteer;
