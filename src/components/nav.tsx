import React from 'react'
import LoginButton from './nav/components/loginbutton'
import useAuthStore from '../store/store'
import LogoutButton from './nav/components/logoutbutton'

type Props = {}

const Nav = (props: Props) => {

  const {token} =  useAuthStore(state => state);

  return (
    token === undefined ?
    <div className='flex flex-row w-full h-16 bg-black justify-between items-center p-5'>
          <h1 className='text-white'>Logo</h1>
          <LoginButton/>
    </div>  
    : 
    <div className='flex flex-row w-full h-16 bg-black justify-between items-center p-5'>
      <h1 className='text-white'>Logo</h1>
      <LogoutButton/>
    </div>  
  )
}

export default Nav