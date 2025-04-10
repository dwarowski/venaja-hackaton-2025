import './App.css';
import './Scroll.css'
import Volunteer from './VolunteerPage/Volunteer';
import OrganiserPage from './OrganiserPage/Organiser';

//Мне нужно в эту штуку передавать объект содержащий сущность пользователя(роль и имя)

function App() {
//Нужно помимо центрирования логосбера в правой стороне добавить отображение имени вошедшего в аккаунт
  return (
    <div className="App">
      <header className="App-header">
        <img src="/upper_line.svg" className="header-image"/>
        <div className='functional-header'>
          <a href="http://www.sberbank.ru"><img src="/logo.svg" className = "header-logo"/></a>
        </div>
      </header>
      {/* <Volunteer></Volunteer>
       */}
       <OrganiserPage></OrganiserPage>
      <footer>
        <p>Powered by Venaja</p>
      </footer>
    </div>
  );
}

export default App;
