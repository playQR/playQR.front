import React, { useEffect } from 'react'
import calendar_icon from '../img/calendar_icon.png';
import location_icon from '../img/location_icon.png';
import checker_img from '../img/checker_img.png';
import { useNavigate } from 'react-router-dom';
import { PromotionCard } from '../../../promotion/types/common';
import { convertStringToDate } from '../../../utils/time';
import { GuestCardType } from '../../types';

type Props = {
  result: GuestCardType,
}

const GuestCard : React.FC<Props> = (props: Props) => {

  const navigate = useNavigate();
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const {
    guestId,
    name,
    reservationCount,
    depositDate
  } = props.result
  
  return (
    <div className="min-w-full mx-auto bg-gray-4 rounded-lg flex flex-col items-start justify-items-center p-10px">
      <div className="text-plg text-system-white">이정한</div>
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