import { useState } from "react"

export default function Participant(){
    const [name,setName] = useState('Name');
    const [surname,setSurname] = useState('Surname');
    const [date,setDate] = useState('01.01.2025');

return(
    <div className='participant'>
        <a href="/" className='participant'>{name}</a>
        <a href="/" className='participant'>{surname}</a>
        <a href="/" className='participant'>{date}</a>
    </div>
)
}