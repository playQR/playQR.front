import React from 'react'
import SearchCard from './searchcard'
import { PromotionCard } from '../../../promotion/types'
import ManageButton from '../buttons/managebutton'
import EditButton from '../buttons/editbutton'
import DeleteButton from '../buttons/deletebutton'
import Line from '../../../common/components/line/line'
import store from '../../../store/store'
import DeleteModal from '../modals/deletemodal'

type Props = {
    results : PromotionCard[]
    isOpen : boolean
    setPromotionId : React.Dispatch<React.SetStateAction<number>>
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    deletePromotion : () => void
}


const SearchResult : React.FC<Props> = (props: Props) => {
  
  const {isOpen,setIsOpen,setPromotionId,deletePromotion} = props;

  
  const result : PromotionCard[] = props.results
  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        result.length !== 0?
          result.map((r) => {
            
            return (
              <div className='w-full'>
                <SearchCard result={r}/>
                <ManageButton id={r.promotionId}/>
                <EditButton id={r.promotionId}/>
                <DeleteButton  id={r.promotionId} setPromotionId = {setPromotionId} setIsOpen={setIsOpen}/>
                <Line/>
              </div>
              )
              
              
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>등록한 공연이 없습니다.</p>
        </div>
      }
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deletePromotion={deletePromotion}/>
    </div>
  )
}

export default SearchResult