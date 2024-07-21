import { useEffect, useRef, useState, useCallback } from 'react'
import SearchResult from './searchresult';
import { axiosSemiSecureAPI } from '../../../axios';
import Loading from '../../../common/loading';
import { GuestCardType } from '../../types';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
type Props = {}

const Guest = (props: Props) => {
    const {id} = useParams();
    const [results, setResults] = useState<GuestCardType[]>([]);
    const target = useRef<HTMLDivElement | null>(null);
    const [isFetching, setIsFetching] = useState(false);
    const [stop, setStop] = useState(false);
    const [page, setPage] = useState(0); // 현재 페이지를 추적
    const [isOpen, setIsOpen] = useState(false);
    const [gid, setGid] = useState<number>(-1);
    
    const closeModal = () => {
        setIsOpen(false)
    }

    // 검색 결과를 가져오는 함수
    const fetchResults = useCallback(async () => {

        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/guests/promotions/${id}/page?currentPage=${page}`)
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
            rootMargin: '0px',
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

    const handleConfirmation = async (guestId : number) => {
        try{
            await toast.promise(
                axiosSemiSecureAPI.post(`/api/guests/${guestId}/reservation/confirmation`, ),
                {
                    loading: '예매 승인 중...',
                    success: <b>예매가 승인되었습니다.</b>,
                    error: <b>예매 승인 실패</b>,
                }
            );
        }
        catch(e){
            //console.log(e);
        }finally{
            setResults([]);
            setPage(0);
            setStop(false);
        }
    }
    const handleCancel = async () => {
        try{
            await toast.promise(
                axiosSemiSecureAPI.delete(`/api/guests/host/${gid}`, ),
                {
                    loading: '예매 취소 중...',
                    success: <b>예매가 취소되었습니다.</b>,
                    error: <b>예매 취소 실패</b>,
                }
            );
        }
        catch(e){
            //console.log(e);
        }finally{
            setResults([]);
            setPage(0);
            setStop(false);
            setGid(-1);
            closeModal();
        }
    }
    return (
        <div className='flex flex-col h-full w-full mt-5'>
            <SearchResult 
                results={results} 
                handleCancel={handleCancel} 
                handleConfirmation={handleConfirmation}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setGid = {setGid}
                />
            <div ref={target} style={{ height: '1px' }}></div>
            {isFetching && <Loading text={"게스트를 가져오는 중입니다."} isLoading={isFetching}/>}
        </div>
    )
}

export default Guest;