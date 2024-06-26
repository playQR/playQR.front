import React from 'react'

type Props = {}

const TicketCreationInfo = (props: Props) => {
  return (
    <div className='font-bold pb-4'>
            <div className ='text-system-white text-ptitle'>
                공연 등록하기
            </div>
            <div className ='text-system-white text-sm font-normal'>
              PlayBarcode로 공연의 시작부터 마지막까지
            </div>
    </div>
  )
}

export default TicketCreationInfo