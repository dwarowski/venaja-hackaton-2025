import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VolunteerPage from './pages/VolunteersPage/VolunteerPage';
import OrganiserPage from './pages/OrganiserPage/organiser';
//Мне 
function App() {
//Нужно помимо центрирования логосбера в правой стороне добавить отображение имени вошедшего в аккаунт
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<VolunteerPage />} />
            <Route path="/volunteer" element={<VolunteerPage />} />
            <Route path="/organiser" element={<OrganiserPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
