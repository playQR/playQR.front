import React from 'react'
import { useNavigate } from 'react-router-dom';
type Props = {}

const CreateButton = (props: Props) => {
    const navigate = useNavigate();
    return (
        <div className='w-full mt-5'>
            <div className='flex h-full justify-end items-end px-4 mb-5 flex-end'>
                <button onClick={()=>navigate('/promotion/create')} className='w-full bg-primary h-46px rounded-xl text-system-white text-plg'>공연 추가하기</button>
            </div>
        </div>
    )
}

export default CreateButton