import React from 'react'
import GridLoader from 'react-spinners/GridLoader'
type Props = {
    text: string;
    isLoading: boolean;
}

const TicketLoading = (props: Props) => {
    const { isLoading, text } = props
  return (
    <div className='flex flex-col items-center justify-items-center w-full h-300px bg-system-white mt-3'>
        <GridLoader color={'#1FDA00'} loading={isLoading} size={50} />
        <div className='text-primary text-plg text-center font-bold'>
            {text}
        </div>
    </div>
  )
}

export default TicketLoading