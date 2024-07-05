import React, { useEffect, useRef, useState, useCallback } from 'react'
import SearchBox from './searchbox';
import SearchResult from './searchresult';
import { axiosAPI } from '../../../axios';
import { PromotionCard } from '../../../promotion/types/common';
import Loading from '../../../common/loading';
type Props = {}

const Search = (props: Props) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적

    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = query === "" 
                ? await axiosAPI.get(`/api/promotions?currentPage=${page}`)
                : await axiosAPI.get(`/api/promotions/search?currentPage=${page}&keyword=${encodeURIComponent(query)}`);
            console.log(res)
            const promotionResult = res.data.result.promotionList;
            if (promotionResult.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(promotionResult.length > 0 && promotionResult.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...res.data.result.promotionList]);
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
            <SearchBox value={query} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)} />
            <SearchResult results={results} />
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"공연을 등록중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Search;