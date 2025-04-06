import Volunteer from './Volunteer';
import './VolunteerPage.css';
import './Scroll.css'
import { Button } from 'antd';
import { useAuthContext } from "../../AuthComponent/auth";
//Мне 
function VolunteerPage() {
//Нужно помимо центрирования логосбера в правой стороне добавить отображение имени вошедшего в аккаунт
const { keycloak , userInfo } = useAuthContext();
  return (
    <div className="App">
      <header className="App-header">
        <img src="/upper_line.svg" className="header-image" alt='abiba'/>
        <div className='functional-header'>
          <a href="http://www.sberbank.ru"><img src="/logo.svg" className = "header-logo" alt='abiba'/></a>
          <Button onClick={() => keycloak.logout()}>
          Logout
          </Button>
        </div>
      </header>
      <Volunteer></Volunteer>
      <footer>
        <p>Powered by Venaja</p>
      </footer>
    </div>
  );
}

export default VolunteerPage;
