import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI,axiosAPI } from '../../../../axios';
import toast from 'react-hot-toast';
import Loading from '../../../../common/loading';
import { PromotionCommentCard } from '../../../types';

type Props = {}


const Search = (props: Props) => {
    const [results, setResults] = useState<PromotionCommentCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [commentId, setCommentId] = useState<number>(-1);
    const closeModal = () => {
        setIsOpen(false)
    }
    const fetchResults = async () => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/comments/my`);
            const commentList = res.data.result.commentList;

            const promotionIds = commentList.map((comment: any) => comment.promotionId);
            const uniquePromotionIds = Array.from(new Set(promotionIds));

            const promotions = await Promise.all(uniquePromotionIds.map(async (promotionId) => {
                const response = await axiosAPI.get(`/api/promotions/${promotionId}`);
                if (response.data.isSuccess) {
                    return {...response.data.result, thumbnail : response.data.result.imageList[0]}
                }
                return null;
            }));

            const filteredPromotions = promotions.filter(Boolean);

            const promotionCommentList: PromotionCommentCard[] = filteredPromotions.map((promotion) => ({
                promotion: {
                    ...promotion,
                },
                comments: commentList.filter((comment: any) => comment.promotionId === promotion.promotionId)
            }));
            
           setResults((prevResults) => [...prevResults, ...promotionCommentList]);
        } catch (err) {
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    };
    
    const deleteComment = async () =>{
        try{
            await toast.promise(
                axiosSemiSecureAPI.delete(`/api/comments/${commentId}`, ),
                {
                    loading: '댓글 삭제중...',
                    success: <b>댓글이 삭제되었습니다.</b>,
                    error: <b>댓글 삭제 실패</b>,
                }
            );
        }
        catch(e){
            //console.log(e);
        }finally{
            setResults([]);
            setCommentId(-1);
            closeModal();
            fetchResults();
        }
    }
    useEffect(()=>{
        fetchResults()
    },[])
    return (
        <div className='flex flex-col h-full w-full mt-5'>
            <SearchResult 
                isOpen={isOpen} 
                setIsOpen={setIsOpen} 
                setCommentId={setCommentId} 
                deleteComment={deleteComment} 
                commentId={commentId}
                isFetching={isFetching}
                results={results}
                closeModal={closeModal}/>
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"가져오는 중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Search;