import React,{useEffect, useState} from 'react'

type Props = {
    isValid : boolean;
    currentIndex : number;
}


const NextButton = (props: Props) => {

    const {currentIndex, isValid} = props;
    
    return (
        <div className='grid flex-row w-full items-end justify-items-end'>
        <button
            className={`h-45px w-75px ${isValid ? 'bg-primary':'bg-gray-1 border-gray-2'} border-1px  text-white rounded-lg`}
            type='submit'
            disabled = {!isValid}
            ><div className={`${isValid ? 'text-system-white' : 'text-gray-2'} text-sm`}>
                { currentIndex === 2 ? '등록하기' : '다음'}
            </div>
        </button>
        </div>
    )
}

export default NextButton