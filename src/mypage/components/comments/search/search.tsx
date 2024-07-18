import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI,axiosAPI } from '../../../../axios';
import toast from 'react-hot-toast';
import Loading from '../../../../common/loading';
import { PromotionCommentCard } from '../../../types';

type Props = {}


const Search = (props: Props) => {
    // const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCommentCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적
    const [isOpen, setIsOpen] = useState(false);
    const [commentId, setCommentId] = useState<number>(-1);
    const closeModal = () => {
        setIsOpen(false)
    }
    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;
        setIsFetching(true);

        try {
            const res = await axiosSemiSecureAPI.get(`/api/comments/my?currentPage=${page}`);
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

            if (promotionCommentList.length === 0) {
                setStop(true);
            } else {
                if (promotionCommentList.length > 0 && promotionCommentList.length < 10) {
                    setStop(true);
                }
                console.log(promotionCommentList)
                setResults((prevResults) => [...prevResults, ...promotionCommentList]);
            }
        } catch (err) {
            setStop(true);
            console.error(err);
        } finally {
            setIsFetching(false);
        }
    }, [page, stop]);
    
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
            setPage(0);
            setStop(false);
            setCommentId(-1);
            closeModal();
        }
    }
    // 페이지가 변경될 때 결과를 가져오기
    useEffect(() => {
        if (!stop) {
            fetchResults();
        }
    }, [page, fetchResults, stop]);

    // 무한 스크롤을 위해 타겟 요소를 감시
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching && !stop) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            root: null,
            rootMargin: '100px',
            threshold: 1.0
        });

        if (target.current) {
            observer.observe(target.current);
        }

        return () => {
            if (target.current) {
                observer.unobserve(target.current);
            }
        };
    }, [isFetching, stop]);

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