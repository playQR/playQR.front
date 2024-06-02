import React from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../../../store/store'
type Props = {}

const LogoutButton = (props: Props) => {
  const {unsetToken} = useAuthStore(state => state);

  const onClick = () => {
    unsetToken();
  }
  return (
    <button className='text-white' onClick={onClick}>
        로그아웃하기
    </button>
  )
}

export default LogoutButton