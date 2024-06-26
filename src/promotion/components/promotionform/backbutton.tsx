import React from 'react'

type Props = {
    isFirstStep: boolean;
    prev : () => void;
}

const BackButton = (props: Props) => {
    const {isFirstStep, prev} = props
    return (
        isFirstStep ? null :  
        <button
                className={`h-45px w-75px bg-gray-1 border-1px border-gray-2 text-white rounded-lg ${
                    isFirstStep ? 'invisible' : ''
                }`}
                onClick={prev}
                >
                <div className={`text-gray-2 text-sm`}>
                    이전
                </div>
        </button>
    )
}

export default BackButton