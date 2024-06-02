import React from 'react'
import { Link, useNavigation, useNavigate } from 'react-router-dom';
type Props = {}

const LoginButton = (props: Props) => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate('/login');
  }
  return (
    <button onClick={onClick} className='text-white'>
        로그인하기
    </button>
  )
}

export default LoginButton