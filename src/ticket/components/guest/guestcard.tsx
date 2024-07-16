import React, { useEffect } from 'react'
import { GuestCardType } from '../../types';

type Props = {
  result: GuestCardType,
}

const GuestCard : React.FC<Props> = (props: Props) => {
  const {
    name,
    reservationCount,
    depositDate,
    writer
  } = props.result
  
  return (
    <div className="min-w-full mx-auto bg-gray-4 rounded-lg flex flex-col items-start justify-items-center p-10px">
      <div className="text-plg text-system-white">{writer.name}</div>
      <table className='w-full'>
        <colgroup>
          <col width='20%'/>
          <col width='80%'/>
        </colgroup>
        <tr>
          <td className='text-text-disabled text-psm'>
            입금자명
          </td>
          <td className='text-system-white text-psm'>
            {name}
          </td>
        </tr>
        <tr>
          <td className='text-text-disabled text-psm'>
            티켓 매수
          </td>
          <td className='text-system-white text-psm'>
            {reservationCount}
          </td>
        </tr>
        <tr>
          <td className='text-text-disabled text-psm'>
            입금날짜
          </td>
          <td className='text-system-white text-psm'>
            {depositDate}
          </td>
        </tr>
      </table>
    </div>
  )
}

export default GuestCard