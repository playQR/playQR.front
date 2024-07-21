import React, { useEffect } from 'react'
import SearchCard from './searchcard'
import { PromotionCard } from '../../../promotion/types/common';
import Line from '../../../common/components/line/line';


type Props = {
    results : PromotionCard[];
    isFetching : boolean;
    onClick : (id:number,value:boolean) => void;
}


const SearchResult : React.FC<Props> = (props: Props) => {
  
  const {isFetching, onClick} = props;
  const result : PromotionCard[] = props.results


  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        
        result.length !== 0 ?
          result.map((r) => {
            
            return (
                <div className='w-full'>
                  <SearchCard result={r} onClick={onClick}/>
                </div>
            )
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>좋아한 프로모션이 없습니다.</p>
        </div>
      }
    </div>
  )
}

export default SearchResult