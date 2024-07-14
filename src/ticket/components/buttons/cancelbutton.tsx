import React from 'react'

type Props = {
    
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelButton = (props: Props) => {
  const {setIsOpen} = props;
    return (
        <div className='w-full mt-10px'>
            <div className='flex h-full justify-end items-end flex-end'>
                <button onClick={()=>{setIsOpen(true);}} className='w-full border-system-error border-1px text-system-error h-46px rounded-xl text-plg'>공연 삭제하기</button>
            </div>
        </div>
    )
}

export default CancelButton