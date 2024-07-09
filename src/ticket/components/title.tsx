import React from 'react'

type Props = {}

const Title = (props: Props) => {
  return (
    <div className='font-bold'>
        <div className ='text-system-white font-semibold text-ptitle'>
                Ticket 관리하기
            </div>
        <div className = 'flex flex-row'>
            <div className ='text-system-white font-normal text-psm'>내가 예매한 공연과 나의 공연을 한 번에 볼 수 있어요</div>
        </div>
    </div>
  )
}

export default Title