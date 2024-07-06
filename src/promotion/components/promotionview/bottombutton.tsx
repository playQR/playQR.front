import React from 'react'

type Props = {}

const backgroundStyle = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 53%, rgba(0, 0, 0, 0.7) 100%)',
};
  
  
const BottomButton = (props: Props) => {
  return (
    <div style={backgroundStyle} className='fixed w-full md:w-640px bottom-0 h-100px'>
        <div className='flex h-full justify-end items-end px-4 pb-54px flex-end'>
            <button className='w-full bg-primary h-46px rounded-xl text-system-white text-plg'>예매하기</button>
        </div>
        
    </div>
  )
}

export default BottomButton