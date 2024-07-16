import React from 'react'
import checkIcon from '../img/check_icon.png'
import { useNavigate } from 'react-router-dom'
import logo from '../../../common/components/img/logo.png'

type Props = {}

const Confirmation = (props: Props) => {
    const navigate = useNavigate();
    return (
        <div className='w-full bg-system-background flex flex-col justify-center items-center h-svh text-system-white p-10'>
            <img src={logo} className='h-100px mb-10 object-cover' style={{ objectFit: 'cover' }}/>
            <img className='h-16 w-20 mb-8' src={checkIcon}/>
                <span className='text-lg text-primary font-bold mb-5 text-pxl'>입장이 완료되었습니다.</span>
                <button className ='bg-gray-4 text-pmd text-gray-2 py-10px px-6 rounded-xl'
                onClick={()=>navigate('/')} >
                    응원하러 가기
                </button>
        </div>
    )
}

export default Confirmation