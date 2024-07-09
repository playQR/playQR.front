import React from 'react'

type Props = {}

const TicketNumInfo = (props: Props) => {
  return (
    <div className='w-full text-left flex flex-row mt-10px'>
        <div className='text-pmd text-primary font-semibold'>
            <div>
                {`팔린 티켓 ${`10`}장`}
            </div>
        </div>
        <div>&nbsp;</div>
        <div className='text-pmd text-gray-2 font-semibold'>
            <div>
                {`남은 티켓 ${`10`}장`}
            </div>
        </div>
    </div>
  )
}

export default TicketNumInfo