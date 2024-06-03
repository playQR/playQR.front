import React from 'react'
import calendar_icon from './img/calendar _icon.png';
import location_icon from './img/location_icon.png';
import checker_img from './img/checker_img.png';

type Result = {
  img : string | undefined,
  band_name : string,
  title : string,
  location : string,
  date : string, 
  price : string
}

type Props = {
  result : Result
}

const SearchCard : React.FC<Props> = (props: Props) => {

  const { img, band_name, title, location, date, price } = props.result

  return (
    <div className="min-w-full mx-auto min-h-1/4 bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative">
        <div className="h-40 w-full bg-gray-200 flex items-center justify-center">
          <img src={checker_img} alt="checker" className="h-40 w-full object-cover" />
        </div>
      </div>
      <div className="pt-2 px-10px">
        <h2 className="text-pxs text-text-plain">{band_name}</h2>
        <p className="text-plg text-text-plain">{title}</p>
      </div>
      <div className="py-2">
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