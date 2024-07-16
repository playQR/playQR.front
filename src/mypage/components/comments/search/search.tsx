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
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/comments/my?currentPage=${page}`)
            const commentResult = res.data.result.commentList.map((res:any)=>{
                return {
                    comments : {
                        id : res.id,
                        promotionId : res.promotionId,
                        content : res.content,
                        createdTime : res.createdTime
                    },
                    promotion : {
                        promotionId : '',
                        title : '',
                        team : '',
                        thumbnail : '',
                        date : '',
                        location : '',
                        startTime : '',
                        endTime : '',
                        entranceFee : 0,
                        like : false,
                        likecount : 0,
                        writer: {
                            name: '',
                            nickname: '',
                            profileImg: ''
                        }
                    }
                };
            })
            
            const PromotionCommentList = commentResult.map(async (res:any)=>{
                try{
                    const response = await axiosAPI.get(`/api/promotions/${res.comments.promotionId}`);
                    if(response.data.isSuccess){
                        return {
                            comments: res.comments,
                            promotion: {
                                thumbnail : response.data.result.imageList[0],
                                ...response.data.result
                            }
                        };
                    }
                }
                catch(e){
                    //console.log(e)
                
                }
            })
            
            const promotioncommentResult = await Promise.all(PromotionCommentList);
            if (promotioncommentResult.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(promotioncommentResult.length > 0 && promotioncommentResult.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...promotioncommentResult]);
            }
        } catch (err) {
            setStop(true); // 에러 발생 시 중지 상태로 설정
            console.error(err);
        } finally {
            setIsFetching(false); // 요청 완료 후 isFetching 상태 변경
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