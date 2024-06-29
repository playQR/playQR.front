import React from 'react'
import backicon from '../../img/backicon.png'
type Props = {
    
    prev : () => void;
}

const BackButton = (props: Props) => {
    const {prev} = props
    return (
         
        <button
                className={`h-30px w-30px p-1 mb-10px`}
                onClick={prev}
                >
                <img src={backicon} className='w-22px' alt="backicon"/>
        </button>
    )
}

export default BackButton