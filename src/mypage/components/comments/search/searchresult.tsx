import React, { useEffect } from 'react'
import SearchCard from './searchcard'
import DeleteModal from '../../modals/deletemodal'
import { PromotionCard } from '../../../../promotion/types/common';
import Line from '../../../../common/components/line/line';
import store from '../../../../store/store';
import { PromotionCommentCard } from '../../../types';
import CommentCard from './commentcard';


type Props = {
    results : PromotionCommentCard[];
    isOpen : boolean;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    deleteComment : () => void
    setCommentId : React.Dispatch<React.SetStateAction<number>>
    commentId : number;
    closeModal : () => void
    isFetching : boolean;
}


const SearchResult : React.FC<Props> = (props: Props) => {
  
  const {isOpen,setIsOpen,deleteComment,closeModal,commentId, setCommentId} = props;

  
  const result : PromotionCommentCard[] = props.results


  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        
        result.length !== 0 ?
          result.map((r) => {
            
            return (
                <div className='w-full'>
                  <SearchCard result={r.promotion}/>
                  <CommentCard 
                    result={r.comments}
                    setIsOpen={setIsOpen}
                    setCommentId={setCommentId}
                  />
                  <Line/>
                </div>
            )
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>검색 결과가 없습니다.</p>
        </div>
      }
      <DeleteModal isOpen={isOpen} setIsOpen={setIsOpen} deleteComment={deleteComment} commentId={commentId} closeModal={closeModal}/>
    </div>
  )
}

export default SearchResult