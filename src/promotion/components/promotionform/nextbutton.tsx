import React from 'react'

type Props = {
    isLastStep : boolean;
    next : () => void;
    isValid : boolean;
}


const NextButton = (props: Props) => {
    const {isLastStep, next, isValid} = props;
    return (
        <button
            className={`h-45px w-75px ${isValid ? 'bg-primary':'bg-gray-1 border-gray-2'} border-1px  text-white rounded-lg ${
                isLastStep ? 'invisible' : ''
            }
                `}
            onClick={next}
            disabled = {!isValid}
            ><div className={`${isValid ? 'text-system-white' : 'text-gray-2'} text-sm`}>
            다음
            </div>
        </button>
    )
}

export default NextButton