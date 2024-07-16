import React from 'react'
import HashLoader from 'react-spinners/HashLoader'
type Props = {
    text: string;
    isLoading: boolean;
}

const Loading = (props: Props) => {
    const { isLoading, text } = props
  return (
    <div className='flex flex-col items-center justify-items-center w-full bg-system-background my-24'>
        <HashLoader color={'#1FDA00'} loading={isLoading} size={150} />
        <div className='text-primary text-plg text-center font-bold mt-5'>
            {text}
        </div>
    </div>
  )
}

export default Loading