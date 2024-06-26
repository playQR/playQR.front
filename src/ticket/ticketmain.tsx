import React from 'react'
import Nav from '../common/components/nav/nav';
import { Link } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
type Props = {}

const Ticket = (props: Props) => {
  const token = useCheckAuth();
  return (
    <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
            <Nav/>
            <div className='flex flex-col w-full h-full p-10'>
              <div className='flex flex-row w-full justify-between'>
                  <h1 className='text-2xl'>Ticket</h1>   
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
                    <Link to='create'>티켓 생성하기</Link>
                  </button>
              </div>
            </div>
    </div>
  )
}

export default Ticket