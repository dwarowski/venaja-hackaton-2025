import './App.css';
import './Scroll.css'
import Volunteer from './VolunteerPage/Volunteer';

//Мне 
function App() {
//Нужно помимо центрирования логосбера в правой стороне добавить отображение имени вошедшего в аккаунт
  return (
    <div className="App">
      <header className="App-header">
        <img src="/upper_line.svg" className="header-image"/>
        <div className='functional-header'>
          <img src="/logo.svg" className = "header-logo"/>
        </div>
      </header>
      <Volunteer></Volunteer>
      <footer>
        <p>Power by Maxeeb & co</p>
      </footer>
    </div>
  );
}

export default App;
