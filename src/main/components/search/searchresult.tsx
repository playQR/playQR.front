import React from 'react'
import SearchCard from './searchcard'
import { PromotionCard } from '../../../promotion/types'


type Props = {
    results : PromotionCard[];
    updateLike : (id:number, value:boolean) => void;
    isAuthenticated : boolean;
    isLoading : boolean;
}


const searchresult : React.FC<Props>= (props: Props) => {

  const result : PromotionCard[]= props.results
  const {updateLike} = props;
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        result.length !== 0?
          result.map((r) => {
            return <SearchCard 
              updateLike={updateLike} 
              result={r} 
              />
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>검색 결과가 없습니다.</p>
        </div>
      }
      
    </div>
  )
}

export default searchresult