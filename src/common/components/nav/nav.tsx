import UserButton from './components/userbutton'
import TicketButton from './components/ticketbutton'
import { useNavigate } from 'react-router-dom'
import useCheckAuth from '../../../utils/hooks/useCheckAuth'
import logo from '../img/logo.png'
type Props = {}

const Nav = (props: Props) => {

  const navigate = useNavigate();
  const {isAuthenticated} = useCheckAuth();
  return (
    <div className='flex flex-row w-full h-16 justify-between items-center'>
          <h1 onClick={()=>navigate('/')}className='text-plg text-primary font-yspotlight'>
            <img src={logo} className='h-42px'></img>
          </h1>
          <div className='flex flex-row h-full items-center space-x-2'>
            <TicketButton isAuthenticated={isAuthenticated}/>
            <UserButton isAuthenticated={isAuthenticated}/>
          </div>
    </div> 
  )
}

export default Nav