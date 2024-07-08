import React from 'react'
import backicon from '../img/backicon.png'
import { useNavigate } from 'react-router-dom'
type Props = {
    
}

const BackButton = (props: Props) => {
    const navigate = useNavigate();
    return (
         
        <button
                className={`h-30px w-30px p-1 mb-10px`}
                onClick={()=>{navigate(-1)}}
                >
                <img src={backicon} className='w-22px' alt="backicon"/>
        </button>
    )
}

export default BackButton