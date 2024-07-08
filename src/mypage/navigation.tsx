import React from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {}

const Navigation = (props: Props) => {

    const navigate = useNavigate();

    return (
        <div className='w-full flex flex-col space-y-3 px-6px text-left'>
            <div className='text-system-white text-psm w-full' onClick={()=>navigate('/mypage/like/promotions')}>
                내가 좋아한 공연
            </div>
            <div className='text-system-white text-psm w-full' onClick={()=>navigate('/mypage/comments')}>
                내 댓글
            </div>
        </div>
        
    )
}

export default Navigation;