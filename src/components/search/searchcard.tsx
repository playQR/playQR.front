import React from 'react'
import calendar_icon from './img/calendar _icon.png';
import location_icon from './img/location_icon.png';
import checker_img from './img/checker_img.png';
import like_icon_true from './img/like_icon_true.png';
import like_icon_false from './img/like_icon_false.png';
import simple_img from './img/simple_img.png';


type Result = {
  img : string | undefined,
  band_name : string,
  title : string,
  location : string,
  date : string, 
  price : string,
  like : boolean,
  like_num : number
}

type Props = {
  result : Result
}

const SearchCard : React.FC<Props> = (props: Props) => {

  const { img, band_name, title, location, date, price, like, like_num } = props.result

  return (
    <div className="min-w-full mx-auto min-h-1/4 bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative">
        <div className="h-40 w-full flex items-center justify-center">
          <img src={simple_img} alt="checker" className="h-full w-full object-cover" />
        </div>
        {/* 10px가 안되는 부분 */}
        <button className="absolute top-2 right-2 bg-white rounded-full w-60px h-30px p-1 shadow-md border-primary"
            style={{
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              background: 'rgba(255, 255, 255, 0.01)',
              borderRadius: '16px',
              border: '1px solid rgba(30, 218, 0)'
                  
            }}>
          <div className='flex flex-row items-center justify-center'>
            { like ? <img src={like_icon_true} alt="like" className="mr-1 w-18px h-4" /> :
             <img src={like_icon_false} alt="like" className="mr-1 w-18px h-4" />}
          <span className="text-xs text-green-600">{like_num}</span>
          </div>
        </button>
      </div>
      <div className="pt-2 px-10px">
        <h2 className="text-pxs text-text-plain">{band_name}</h2>
        <p className="text-plg text-text-plain">{title}</p>
      </div>
      <div className="">
        <div className='flex flex-row w-full items-center'>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
          <div className="w-full border-t border-dashed border-gray-4"></div>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
        </div>
      </div>
      <div className="pb-2 px-10px">
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
            </div>
            <div className="text-plg text-primary">{price}</div>
          </div>
        </div>
      </div>
  )
}

export default SearchCard