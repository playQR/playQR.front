import React, { useEffect } from 'react'
import calendar_icon from '../../img/calendar_icon.png';
import location_icon from '../../img/location_icon.png';
import checker_img from '../../img/checker_img.png';

import { PromotionCard } from '../../../promotion/types/common';
import { convertStringToDate } from '../../../utils/time';
import LikeButton from '../../../common/components/buttons/like_button';

type Props = {
  result: PromotionCard;
  onClick : (id:number,value:boolean) => void;
}

const SearchCard : React.FC<Props> = (props: Props) => {

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const {
    promotionId,
    title,
    team,
    thumbnail,
    date,
    location,
    startTime,
    endTime,
    entranceFee,
  } = props.result

  const {onClick} = props;
  
  return (
    <div className="min-w-full mx-auto min-h-1/4 bg-white rounded-lg shadow-md overflow-hidden relative mb-10px">
      <div className="relative">
        <div className="h-40 w-full flex items-center justify-center">
          <img src={thumbnail === '' ? checker_img : thumbnail} alt="checker" className="h-full w-full object-cover" />
        </div>
        <LikeButton like={true} like_num={1} onClick={()=>onClick(promotionId,true)} id={promotionId}/>
      </div>
      <div className="pt-2 px-10px">
        <h2 className="text-pxs text-text-plain">{team}</h2>
        <p className="text-plg text-text-plain">{title}</p>
      </div>
      <div className="">
        <div className='flex flex-row w-full items-center'>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
          <div className="w-full border-t border-dashed border-gray-4"></div>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
        </div>
      </div>
      <div className="pb-2 px-10px flex flex-row justify-between items-center">
        <div className='flex flex-col'>
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <img src={location_icon} alt="calendar" className="w-4 h-4 mr-1"/>
                <div className="text-text-plain text-pxs">{location}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <img src={calendar_icon} alt="calendar" className="w-4 h-4 mr-1"/>
                <div className="text-text-plain text-pxs">{date}</div>
                <div>&nbsp;</div>
                <div className="text-text-plain text-pxs">{WEEKDAY[new Date(date).getDay()]}</div>
                <div>&nbsp;</div>
                <div className="text-text-plain text-pxs">{`${convertStringToDate(startTime)}~`}</div>
                <div className="text-text-plain text-pxs">{convertStringToDate(endTime)}</div>
              </div>
            </div>
          </div>
          <div className="text-plg text-primary">{`${entranceFee}₩`}</div>
        </div>
      </div>
  )
}

export default SearchCard