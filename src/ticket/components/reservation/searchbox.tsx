import React from 'react'
import search_icon from '../img/search_icon.png'
type Props = {
    value:string
    onChange : (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = (props: Props) => {
    const {value, onChange} = props
    return (
        <div className='w-full flex flex-row bg-gray-5 justify-between items-center rounded-3xl mb-5'>
        <input
            className='w-full bg-gray-5 text-gray-3 ml-14px'
            type="search"
            placeholder="찾고 있는 공연이 있나요?"
            value={value}
            onChange={onChange}
        >
        </input>
        <button>
            <img src={search_icon} alt="search" className='w-38px h-38px mx-14px my-1'></img>
        </button>
        </div>
  )
}

export default SearchBox