import React from 'react'
import { Link, useNavigation, useNavigate } from 'react-router-dom';
import userButton from './img/user_icon.png'
import store from '../../../../store/store';
type Props = {
  isAuthenticated : boolean;
}

const UserButton = (props: Props) => {
  const navigate = useNavigate();

  const {useModalStore} = store;

  const {openModal} = useModalStore(state => state);

  const onClick = () => {
    if(!props.isAuthenticated) {
      openModal();
    }
    else{
      navigate('/mypage');
    }
  }
  return (
    <button onClick={onClick} className=''>
      <img src={userButton} alt="user" className='w-10 h-10'/>
    </button>
    
  )
}

export default UserButton