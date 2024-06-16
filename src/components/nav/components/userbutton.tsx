import React from 'react'
import { Link, useNavigation, useNavigate } from 'react-router-dom';
import userButton from './img/user_icon.png'
type Props = {}

const UserButton = (props: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
  }
  return (
    <button onClick={onClick} className=''>
      <img src={userButton} alt="user" className='w-10 h-10'/>
    </button>
    
  )
}

export default UserButton