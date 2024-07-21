import React, { useEffect } from 'react'
import SearchCard from './searchcard'
import Line from '../../../common/components/line/line'
import { TicketCardType } from '../../types'
import TicketReservationButton from '../buttons/ticketreservationbutton'

type Props = {
    results : TicketCardType []
    
}
const SearchResult : React.FC<Props> = (props: Props) => {
 
  const result : TicketCardType[] = props.results;
  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        result.length !== 0?
          result.map((r) => {
            return (
              <div className='w-full'>
                <SearchCard result={r.promotion}/>
                <TicketReservationButton
                  pid = {r.promotion.promotionId}
                  result = {
                    r.guest
                  }/>
                <Line/>
              </div>
              )
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>예매한 공연이 없습니다.</p>
        </div>
      }
    </div>
  )
}

export default SearchResult