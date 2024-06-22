import React from 'react'
import Nav from '../components/nav';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
type Props = {}

const Ticket = (props: Props) => {
  const token = useCheckAuth();
  return (
    <div className='flex flex-col container max-w-screen-md h-screen'>
            <Nav/>
            <div className='flex flex-col w-full h-full p-10'>
              <div className='flex flex-row w-full justify-between'>
                  <h1 className='text-2xl'>Ticket</h1>   
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white">
                    <Link to='create'>티켓 생성하기</Link>
                  </button>
              </div>
              <div className='border-b-2 border-gray-300 mt-3'></div>
              <div className='flex flex-col w-full mt-5'>
                <div className='flex flex-row w-full justify-between'>
                  <div className='flex flex-col'>
                    <h2 className='text-xl'>티켓번호</h2>
                    <p>1234567890</p>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='text-xl'>티켓 생성일</h2>
                    <p>2021-09-01</p>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='text-xl'>티켓 만료일</h2>
                    <p>2021-09-30</p>
                  </div>
                  <div className='flex flex-col'>
                    <h2 className='text-xl'>티켓 사용여부</h2>
                    <p>사용중</p>
                  </div>
                </div>
                </div>
                <div className='border-b-2 border-gray-300 mt-3'></div>
              </div>
            <Footer/>
    </div>
  )
}

export default Ticket