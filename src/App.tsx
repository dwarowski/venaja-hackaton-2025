import './App.css';
import { Panel } from './components/Panel/Panel';
import Participant from './components/Participant/Participant';
import Volunteer from './VolunteerPage/Volunteer';

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1>Сбер. Страница Волонтерства</h1>
        </div>
      </header>

      <Panel></Panel>

      <footer>
        <p>Power by Maxeeb & Tretchian</p>
      </footer>
    </div>
  );
}

export default App;
