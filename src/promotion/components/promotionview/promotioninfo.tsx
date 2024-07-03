import React from 'react'
import sample_image_lg from '../../img/sample_image_lg.png'
import location_icon_white from '../../img/location_icon_white.png'
import calendar_icon_white from '../../img/calendar_icon_white.png'
import { ViewPromotion } from '../../types';
import ShowInfo from './showinfo'
import TalkInfo from './talkinfo'
type Props = {
  promotion_info : ViewPromotion
}

const PromotionInfo = (props: Props) => {
  const { promotionId, title, content, team, musicList, imageList, location, date, startTime, billing, comment } = props.promotion_info

  const [isLeft, setIsLeft] = React.useState<boolean>(true);

  const onLeftClick = () => {
    setIsLeft(true);
    
  }

  const onRightClick = () => {
    setIsLeft(false);
    
  }
  return (
    <div className = 'w-full'>
        <img className='mt-18px w-full h-350px object-cover' src={sample_image_lg}></img>
        <div className='w-full mt-10px mx-6px'>
            <div className='text-plg text-system-white'>{team}</div>
            <div className='text-ptitle font-semibold text-system-white'>{title}</div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center">
              <img src={location_icon_white} alt="calendar" className="w-4 h-4 mr-1"/>
              <div className="text-gray-2 text-psm">{location}</div>
            </div>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src={calendar_icon_white} alt="calendar" className="w-4 h-4 mr-1"/>
              <div className="text-gray-2 text-psm">{date}</div>
            </div>
            </div>
            </div>
            <div className="text-ptitle font-semibold text-primary">{`${32000}₩`}</div>
          
        </div>
        <div className="flex flex-row w-full mt-5 h-10">
          <div onClick={onLeftClick} style={{ background : isLeft ? "#474747" : "#2A2A2A"}} className="rounded-l-xl flex w-1/2 items-center justify-center">
            <div className="text-white text-pmd">공연 정보</div>
          </div>
          <div onClick={onRightClick} style={{ background : !isLeft ? "#474747" : "#2A2A2A"}} className="rounded-r-xl flex w-1/2 items-center justify-center">
              <div className="text-white text-pmd">응원 Talk</div>
          </div>
        </div>
          {
              isLeft ? <ShowInfo 
                  musicList={musicList}
                  content={content}
                  refundPolicy={billing.refundInfo}
                  /> : <TalkInfo comment = {comment}/>
          }
    </div>
  )
}

export default PromotionInfo