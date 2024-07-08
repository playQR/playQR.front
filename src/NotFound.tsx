import React from 'react'
import { useNavigate } from 'react-router-dom';
type Props = {}

const NotFound = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center bg-system-background'>
            <p className='text-ptitle font-bold text-system-white mb-5'>존재하지 않는 페이지입니다.</p>
            <p className='text-pxl font-bold text-system-white mb-5'>404 ERROR</p>
            <button className='bg-primary rounded-lg py-3 px-6 text-system-white'onClick={() => navigate('/')}>홈으로 돌아가기</button>
        </div>
  )
}

export default NotFound;