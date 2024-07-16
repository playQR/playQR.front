import React from 'react'
import { useNavigate } from 'react-router-dom';
type Props = {
    id:number;
}

const EditButton = (props: Props) => {
    const navigate = useNavigate();
    const {id} = props;
    return (
        <div className='w-full mt-10px'>
            <div className='flex h-full justify-end items-end flex-end'>
                <button onClick={()=>navigate(`/promotion/${id}/edit`)} className='w-full border-gray-2 border-1px h-46px rounded-xl text-system-white text-plg'>공연 정보 수정하기</button>
            </div>
        </div>
    )
}

export default EditButton