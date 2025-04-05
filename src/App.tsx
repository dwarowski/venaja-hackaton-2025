import './App.css';
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
      <Participant></Participant>
      <Participant></Participant>
      <Participant></Participant>
      <Participant></Participant>
      <footer>
        <p>Power by Maxeeb & Tretchian</p>
      </footer>
    </div>
  );
}

export default App;
