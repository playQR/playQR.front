import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI } from '../../../axios';
import Loading from '../../../common/loading';
import toast from 'react-hot-toast';
import store from '../../../store/store';
import { TicketCardType } from '../../types';
type Props = {}

const Search = (props: Props) => {

    const [results, setResults] = useState<TicketCardType[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [promotionId, setPromotionId] = useState<number>(-1);
    const {useModalStore} = store;
    const {closeModal} = useModalStore();

    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/guests/guest/page?page=${page}`)
            const result = res.data.result;
            
            if (result.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(result.length > 0 && result.length < 10) {
                  setStop(true);
                }
                setResults((prevResults) => [...prevResults, ...res.data.result]);
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
            {isFetching && <Loading text={"프로모션을 가져오는 중입니다."} isLoading={isFetching}/>}
            
        </div>
    )
}

export default Search;