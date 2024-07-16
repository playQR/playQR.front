import React from 'react'
import { MoonLoader } from 'react-spinners';
type Props = {
    text: string;
    isLoading: boolean;
}

const BankLoading = (props: Props) => {
    const { isLoading, text } = props
  return (
    <div className='flex flex-row items-center justify-items-center w-full my-4 bg-system-white space-x-2'>
        <div className='text-text-disable text-psm text-center mr-2'>
            {text}
        </div>
        <MoonLoader color={'#2A2A2A'} loading={isLoading} size={16} />
    </div>
  )
}

export default BankLoading