import { useState } from "react"
import './Participant.css';
import {useAuthContext} from '../../context/auth';

export default function Participant(){
    const [name,setName] = useState('Name');
    const [surname,setSurname] = useState('Surname');
    const [date,setDate] = useState('01.01.2025');
    const [role,setRole] = useState('НеГражданин');
return(
    
    <div className='parent'>
        <div className='info'>
            <a className='participant'>{role}</a>
            <a className='participant'>{name}</a>
            <a className='participant'>{surname}</a>
            <a className='participant'>{date}</a>
        </div>
        <div className='info'>
            <button 
            className={`button & button-accept `}
            onClick={()=> setRole('Принят')/* Заглушка до связи с бэком*/}> 
            Принять
            </button>
            <button
            className={`button & button-decline`}
            onClick={()=> setRole('Отклонён')/* Заглушка до связи с бэком*/}>Отклонить</button>
        </div>
    </div>
)
}