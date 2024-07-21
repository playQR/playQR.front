import React, { useEffect, useRef, useState, useCallback } from 'react'
import SearchBox from './searchbox';
import SearchResult from './searchresult';
import { axiosAPI,axiosSemiSecureAPI } from '../../../axios';
import { PromotionCard } from '../../../promotion/types/common';
import Loading from '../../../common/loading';
import toast from 'react-hot-toast'
import useCheckAuth from '../../../utils/hooks/useCheckAuth';
import store from '../../../store/store';
import { handleApiError } from '../../../utils/error';

type Props = {}

const Search = (props: Props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const {isAuthenticated , isLoading} = useCheckAuth();
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적
    const { useModalStore } = store;
    const {openModal} = useModalStore(state => state);


    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = query === "" 
                ? await axiosAPI.get(`/api/promotions/search?currentPage=${page}`)
                : await axiosAPI.get(`/api/promotions/search?currentPage=${page}&keyword=${encodeURIComponent(query)}`);
            
            
            const promotionResult = res.data.result.promotionList.map((res:any)=>{
                return {...res, like : false, likecount : 0};
            })
           
            
            const likeResultPromises = promotionResult.map(async (promotion: PromotionCard) => {
                let likeCount = 0;
                try{
                    const response = await axiosAPI.get(`/api/likes/promotion/${promotion.promotionId}/count`);
                    if(response.data.isSuccess){
                       likeCount = response.data.result;
                        if(isAuthenticated){
                            try{
                                const response = await axiosSemiSecureAPI.get(`/api/likes/promotion/${promotion.promotionId}`);
                                if(response.data.isSuccess){
                                    return {...promotion, like : response.data.result, likecount : likeCount};
                                }
                            }catch(e){
                                return {...promotion, like : false, likecount : likeCount};
                                //console.log(e)
                            }
                        }
                        else{
                            handleApiError(response.data)
                            return {...promotion, like : false, likecount : likeCount}
                        }
                    }else{
                        return {...promotion, like : false, likecount : 0};
                    }
                }
                catch(e){
                    
                    //console.log(e);
                }
            });
            const likeResult = await Promise.all(likeResultPromises);
            if (likeResult.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(likeResult.length > 0 && likeResult.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...likeResult]);
            }
        } catch (err) {
            setStop(true); // 에러 발생 시 중지 상태로 설정
            console.error(err);
        } finally {
            setIsFetching(false); // 요청 완료 후 isFetching 상태 변경
        }
    }, [query, page, stop]);

    // 쿼리가 변경될 때 새로운 결과를 가져오기
    useEffect(() => {
        setResults([]);
        setPage(0);
        setStop(false);// 새 검색 시 정지 상태 해제
    }, [query]);
    

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
           
            rootMargin:'300px 0px',
            threshold: [0,0.3,1]
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

    const updateLikeStatus = async (id: number) => {
        try {

        // 좋아요 수 가져오기
        const responseLikeCount = await axiosAPI.get(`/api/likes/promotion/${id}/count`);
        const likeCount = responseLikeCount.data.isSuccess ? responseLikeCount.data.result : 0;

        // 좋아요 상태 가져오기
        let promotionLike = false;
        if (isAuthenticated) {
            try {
            const responseLikeStatus = await axiosSemiSecureAPI.get(`/api/likes/promotion/${id}`);
            promotionLike = responseLikeStatus.data.isSuccess ? responseLikeStatus.data.result : false;
            } catch (error) {
            promotionLike = false;
            }
        }
        setResults((prevResults) => {
            return prevResults.map((promotion) => {
            if (promotion.promotionId === id) {
                return {
                ...promotion,
                like: promotionLike,
                likecount: likeCount,
                };
            }
            return promotion;
            });
        });} catch (e) {
            //console.log(e)
        } finally {
        setIsLikeLoading(false);
        }
    };

    const updateLike = async (id: number, value: boolean) => {
        if(isFetching)return;
        if(isLikeLoading) return;
        if(isAuthenticated){
            setIsLikeLoading(true);
            if (value) {
                try {
                    await toast.promise(
                    axiosSemiSecureAPI.delete(`/api/likes/promotion/${id}`),
                    {
                        loading: '좋아요 처리중..',
                        success: <b>좋아요가 취소되었습니다.</b>,
                        error: <b>좋아요를 처리할 수 없습니다.</b>,
                    }
                );
                } catch (e) {
                //console.log(e);
                }
                finally{
                updateLikeStatus(id);
                }
            }
            else{
                try {
                    await toast.promise(
                    axiosSemiSecureAPI.post(`/api/likes/promotion/${id}`),
                    {
                        loading: '좋아요 처리중..',
                        success: <b>좋아요를 눌렀습니다.</b>,
                        error: <b>좋아요를 처리할 수 없습니다.</b>,
                    }
                );
                } catch (e) {
                //console.log(e);
                }finally{
                    updateLikeStatus(id);
                }
            }
        }else{
            openModal();
        }
    }

    return (
        <div className='flex flex-col h-full w-full mt-5'>
            <SearchBox value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
            <SearchResult results={results} updateLike={updateLike} isAuthenticated={isAuthenticated} isLoading={isLoading}/>
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"프로모션을 가져오는 중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Search;