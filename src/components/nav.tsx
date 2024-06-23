import React from 'react'
import LoginButton from './nav/components/loginbutton'
import useAuthStore from '../store/store'
import LogoutButton from './nav/components/logoutbutton'
import UserButton from './nav/components/userbutton'
import TicketButton from './nav/components/ticketbutton'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Nav = (props: Props) => {
  const navigate = useNavigate();

  // const {token} =  useAuthStore(state => state);

  return (
    <div className='flex flex-row w-full h-16 justify-between items-center'>
          <h1 onClick={()=>navigate('/')}className='text-plg text-primary font-yspotlight'>LOGO 위치</h1>
          <div className='flex flex-row h-full items-center space-x-2'>
            <TicketButton/>
            <UserButton/>
          </div>
    </div> 
  )
}

export default Nav