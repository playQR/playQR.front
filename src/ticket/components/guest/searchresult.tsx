import React from 'react'
import { GuestCardType } from '../../types'
import GuestCard from './guestcard'

type Props = {
    results : GuestCardType[]
}

const GuestResult : React.FC<Props> = (props: Props) => {
  
  const result : GuestCardType[] = props.results
  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        result.length !== 0?
          result.map((r) => {
            
            return (
              <div className='w-full'>
                <GuestCard result={r}/>
              </div>
              )
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>예매자가 없습니다.</p>
        </div>
      }
    </div>
  )
}

export default GuestResult