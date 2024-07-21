import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI } from '../../../axios';
import { PromotionCard } from '../../../promotion/types/common';
import Loading from '../../../common/loading';
import toast from 'react-hot-toast';
import store from '../../../store/store';
type Props = {}

const Search = (props: Props) => {
    // const [query, setQuery] = useState("");
    const [results, setResults] = useState<PromotionCard[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적
    const [isOpen, setIsOpen] = useState(false);
    const [promotionId, setPromotionId] = useState<number>(-1);
    const {useModalStore} = store;
    const {closeModal} = useModalStore();

    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/promotions/my?currentPage=${page}`)
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
    }, [page, stop]);
    
    const deletePromotion = async () =>{ 
        
        try{
            await toast.promise(
                axiosSemiSecureAPI.delete(`/api/promotions/${promotionId}`, ),
                {
                    loading: '공연 삭제중...',
                    success: <b>공연이 삭제되었습니다.</b>,
                    error: <b>공연 삭제 실패</b>,
                }
            );
        }
        catch(e){
            //console.log(e);
        }finally{
            setResults([]);
            setPage(0);
            setStop(false);
            setPromotionId(-1);
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
    useLayoutEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !isFetching && !stop) {
                setPage((prevPage) => prevPage + 1);
            }
        }, {
            rootMargin: '300px 0px',
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

    return (
        <div className='flex flex-col h-full w-full mt-5'>
            <SearchResult isOpen={isOpen} setIsOpen={setIsOpen} setPromotionId={setPromotionId} deletePromotion={deletePromotion} results={results} />
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"프로모션을 가져오는 중입니다."} isLoading={isFetching}/>}
            
        </div>
    )
}

export default Search;