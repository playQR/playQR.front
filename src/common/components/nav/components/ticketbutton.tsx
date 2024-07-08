import { useNavigate } from 'react-router-dom';
import ticket_icon from './img/ticket_icon.png'
import store from '../../../../store/store';

type Props = {
  isAuthenticated : boolean;
}

const TicketButton = (props: Props) => {
  const navigate = useNavigate();

  const {useModalStore} = store;

  const {openModal} = useModalStore(state => state);
  

  const onClick = () => {
    if(!props.isAuthenticated) {
      openModal();
    }
    else{
      navigate('/ticket');
    }
    
  }
  return (
    <button onClick={onClick} className='text-white'>
      <img src={ticket_icon} alt="ticket" className='w-10 h-10'/>
    </button>
    
  )
}

export default TicketButton