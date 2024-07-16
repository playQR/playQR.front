import React from 'react'
import { useNavigate } from 'react-router-dom';
import store from '../../../store/store';
type Props = {}

const CreateButton = (props: Props) => {
    const {useCreatePromotionStore} = store;
    const {clearData} = useCreatePromotionStore();
    const navigate = useNavigate();

    const onClick = () => {
        // 수정 화면에서 돌아오게 되면 그대로 유지 되는 버그 발생
        clearData();
        navigate('/promotion/create');
    }
    return (
        <div className='w-full mt-5'>
            <div className='flex h-full justify-end items-end px-4 mb-5 flex-end'>
                <button onClick={onClick} className='w-full bg-primary h-46px rounded-xl text-system-white text-plg'>공연 추가하기</button>
            </div>
        </div>
    )
}

export default CreateButton