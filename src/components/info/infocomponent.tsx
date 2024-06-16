import React from 'react'
import { Link } from 'react-router-dom'
import store from '../../store/store';
import { useNavigate } from 'react-router-dom';
import KakaoModal from '../../login/Modal';
type Props = {}

const Title = () => {
    return (
        <div className='font-bold'>
            <div className ='text-system-white text-ptitle'>
                    그리고, 우리 둘
                </div>
            <div className = 'flex flex-row'>
                <div className ='text-primary text-ptitle text-700'>아무 말 없이&nbsp;</div>
                <div> </div>
                <div className ='text-system-white text-ptitle'> 나란히</div>
            </div>
        </div>
    )
}

const InfoComponent = (props: Props) => {

    const { useAuthStore,useModalStore } = store;
    const { token } = useAuthStore(state => state);
    const { openModal } = useModalStore(state => state);
    
    return (
        token === undefined ? 
            <div className='flex flex-col w-full items-start'>
                <button onClick={openModal}>
                    <div className='text-system-white mb-10px text-psm underline'>
                        로그인을 해주세요
                    </div>
                </button>
                <Title/>
            </div> : 
            <div className='flex flex-col w-full'>
                <div className='text-system-white mb-10px text-psm'>
                    안녕하세요, 이정한님!
                </div>
                <Title/>
            
        </div>
  )
}

export default InfoComponent