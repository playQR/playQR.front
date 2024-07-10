import React from 'react'

type Props = {}

const backgroundStyle = {
   background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 53%, rgba(0, 0, 0, 0.7) 100%)',
};
  
  
const BottomButton = ({ disabled }: { disabled: boolean }) => {
  return (
    
    <div style={backgroundStyle} className='fixed w-full sm:w-640px bottom-0 h-100px -mx-4'>
        <div className='flex h-full justify-end items-end px-4 pb-54px flex-end'>
             <button
                type="submit"
                className={`w-full py-3 rounded ${disabled ? 'bg-gray-2' : 'bg-primary'}`}
                disabled={disabled}
              >
                예매하기
              </button>
        </div>
    </div>
  )
}

export default BottomButton