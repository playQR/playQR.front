import React from 'react'
import { Link, useNavigation, useNavigate } from 'react-router-dom';
import ticket_icon from './img/ticket_icon.png'
type Props = {}

const TicketButton = (props: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/ticket');
  }
  return (
    <button onClick={onClick} className='text-white'>
      <img src={ticket_icon} alt="ticket" className='w-10 h-10'/>
    </button>
    
  )
}

export default TicketButton