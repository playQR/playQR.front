import { useEffect, useRef, useState, useCallback } from 'react';
import SearchResult from './searchresult';
import toast from 'react-hot-toast';
import Loading from '../../../common/loading';
import { axiosAPI, axiosSemiSecureAPI } from '../../../axios';
import { PromotionCard } from '../../../promotion/types/common';

type Props = {};

const Search = (props: Props) => {
    // const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [isLikeLoading, setIsLikeLoading] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적
    
    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return; // 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get('/api/likes/promotion/promotions');
            if (res.data.isSuccess) {
                const likePromise = res.data.result.promotionList.map(async (res: any) => {
                    try {
                        const likeCount = await axiosAPI.get(`/api/likes/promotion/${res.promotionId}/count`);
                        const like = await axiosSemiSecureAPI.get(`/api/likes/promotion/${res.promotionId}`);
                        if (likeCount.data.isSuccess && like.data.isSuccess) {
                            return { ...res, like: like.data.result, likecount: likeCount.data.result };
                        }
                    } catch (e) {
                        //console.log(e);
                    }
                });
                
                const likeResults = await Promise.all(likePromise);
                const filteredResults = likeResults.filter(result => result !== undefined); // undefined 값 필터링
                setResults(prevResults => [...prevResults, ...filteredResults]);

                if (filteredResults.length < 10) {
                    setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
                }
            } else {
                alert('공연 정보를 불러오는데 실패했습니다.');
                setStop(true);
            }
        } catch (err) {
            setStop(true); // 에러 발생 시 중지 상태로 설정
            console.error(err);
        } finally {
            setIsFetching(false); // 요청 완료 후 isFetching 상태 변경
        }
    }, [page, stop, isFetching]);
    
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
            rootMargin: '0px',
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
            try {
                const responseLikeStatus = await axiosSemiSecureAPI.get(`/api/likes/promotion/${id}`);
                promotionLike = responseLikeStatus.data.isSuccess ? responseLikeStatus.data.result : false;
            } catch (error) {
                promotionLike = false;
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
            setPage(0);
            setResults([]);
            setStop(false);

        }
    };

    const updateLike = async (id: number, value: boolean) => {
        if(isFetching)return;
        if(isLikeLoading) return;
        
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
        
    }
    
    return (
        <div className='flex flex-col h-full w-full mt-5'>
            <SearchResult 
                isFetching={isFetching}
                onClick={updateLike}
                results={results} />
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"가져오는 중입니다."} isLoading={isFetching} />}
        </div>
    );
};

export default Search;
