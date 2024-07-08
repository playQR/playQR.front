import React from 'react'
import { useNavigate } from 'react-router-dom';
type Props = {
    id:number;
}

const ManageButton = (props: Props) => {
    const {id} = props;
    const navigate = useNavigate();
    return (
        <div className='w-full mt-10px'>
            <div className='flex h-full justify-end items-end flex-end'>
                <button onClick={()=>navigate(`/promotion/${id}/manage`)} className='w-full bg-primary h-46px rounded-xl text-system-white text-plg'>예매자 관리하기</button>
            </div>
        </div>
    )
}

export default ManageButton