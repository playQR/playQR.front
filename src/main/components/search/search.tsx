import React, { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import SearchBox from './searchbox';
import SearchResult from './searchresult';
import { axiosAPI,axiosSemiSecureAPI } from '../../../axios';
import { PromotionCard, PromotionCardV2, LikeInfo } from '../../../promotion/types/common';
import Loading from '../../../common/loading';
import toast from 'react-hot-toast'
import useCheckAuth from '../../../utils/hooks/useCheckAuth';
import store from '../../../store/store';

type Props = {}

const Search = (props: Props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCardV2[]>([]);
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
       
        if (isFetching || stop || isLoading) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = isAuthenticated === false? 
                await axiosAPI.get(`/api/v2/promotions/search?currentPage=${page}&keyword=${encodeURIComponent(query)}`) :
                await axiosSemiSecureAPI.get(`/api/v2/promotions/search/auth?currentPage=${page}&keyword=${encodeURIComponent(query)}`)
            const result = res.data.result.promotionList;
        
            if (result.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(result.length > 0 && result.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...result]);
            }
        } catch (err) {
            
            setStop(true); // 에러 발생 시 중지 상태로 설정
            console.error(err);
        } finally {
            
            setIsFetching(false); // 요청 완료 후 isFetching 상태 변경
        }
    }, [query, page, stop, isAuthenticated]);

    

    // 쿼리가 변경될 때 새로운 결과를 가져오기
    useEffect(() => {
        setResults([]);
        setPage(0);
        setStop(false);// 새 검색 시 정지 상태 해제
    }, [query,isAuthenticated]);
    

    // 페이지가 변경될 때 결과를 가져오기
    // useLayoutEffect를 사용한 이유
    // safari 브라우저의 기이한 렌더링 방식
    // 때문에 들어가는 순간 자꾸 page가 1로 초기화되는 문제가 발생
    useLayoutEffect(() => {
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
           
            rootMargin:'0px 0px',
            threshold:0.9
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
        const boardLikeInfo = {
            count: likeCount,
            liked: promotionLike
        }
        setResults((prevResults) => {
            return prevResults.map((promotion) => {
            if (promotion.promotionId === id) {
                return {
                ...promotion,
                boardLikeInfo
                };
            }
            return promotion;
            });
        });
        } catch (e) {
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
                    const response = await toast.promise(
                    axiosSemiSecureAPI.delete(`/api/likes/promotion/${id}`),
                    {
                        loading: '좋아요 처리중..',
                        success: <b>좋아요가 취소되었습니다.</b>,
                        error: <b>좋아요를 처리할 수 없습니다.</b>,
                    });
                   
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
        <div className='flex flex-col w-full h-full mt-5'>
            <SearchBox value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
            <SearchResult results={results} updateLike={updateLike} isAuthenticated={isAuthenticated} isLoading={isLoading}/>
            <div ref={target}></div>
            {isFetching && <Loading text={"프로모션을 가져오는 중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Search;
