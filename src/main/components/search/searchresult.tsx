import React, { useEffect } from 'react'
import SearchCard from './searchcard'
import { PromotionCardV2 } from '../../../promotion/types'


type Props = {
    results : PromotionCardV2[];
    updateLike : (id:number, value:boolean) => void;
    isAuthenticated : boolean;
    isLoading : boolean;
}


const SearchResult : React.FC<Props>= (props: Props) => {

  
  const {updateLike} = props;
  return (
    <div className='flex flex-col items-center justify-center w-full space-y-5'>
      {
        props.results.length !== 0?
          props.results.map((r) => {
            return <SearchCard 
              updateLike={updateLike} 
              result={r} 
              />
          }) : 
        <div className='flex items-center justify-center w-full'>
          <p className='text-gray-3'>검색 결과가 없습니다.</p>
        </div>
      }
      
    </div>
  )
}

export default SearchResult