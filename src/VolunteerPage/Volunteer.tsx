import React, { useState } from 'react';
import './Volunteers.css';
import MyEvents from './MyEvents';
import FutureEvents from './FutureEvents';

type Tab = 'my' | 'future';

const Volunteer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('my');

  return (
    <div className="parent">
      <div className="child buttons">
        <button
          className={`button ${activeTab === 'my' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('my')}
        >
          Мои события
        </button>
        <button
          className={`button ${activeTab === 'future' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('future')}
        >
          Будущие мероприятия
        </button>
        
        <button
          className={`button ${activeTab === 'future' ? 'button-active' : 'button-inactive'}`}
          onClick={() => setActiveTab('future')}
        >
          Завершенные мероприятия
        </button>
      </div>
      <div className="child">
        <div className="EventsList">
          {activeTab === 'my' ? <MyEvents /> : <FutureEvents />}
        </div> 
      </div>
    </div>
  );
};

export default Volunteer;
