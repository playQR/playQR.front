import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI } from '../../../axios';
import Loading from '../../../common/loading';
import { GuestCardType } from '../../types';
import { useParams } from 'react-router-dom';
type Props = {}

const Guest = (props: Props) => {
    const {id} = useParams();
    const [results, setResults] = useState<GuestCardType[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적

    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {

        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/guests/promotions/${id}/page?currentPage=${page}`)
            console.log(res)
            const guestResult = res.data.result.guestList;
            if (guestResult.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(guestResult.length > 0 && guestResult.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...res.data.result.guestList]);
            }
        } catch (err) {
            setStop(true); // 에러 발생 시 중지 상태로 설정
            console.error(err);
        } finally {
            setIsFetching(false); // 요청 완료 후 isFetching 상태 변경
        }
    }, [page, stop]);
    
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
            <SearchResult results={results} />
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"게스트를 가져오는 중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Guest;