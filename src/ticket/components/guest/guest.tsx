import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useLayoutEffect,
} from "react";
import SearchResult from "./searchresult";
import { axiosSemiSecureAPI } from "../../../axios";
import { GuestCardType } from "../../types";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import SearchBox from "./searchbox";
type Props = {};

const Guest = (props: Props) => {
  const { id } = useParams();
  const [results, setResults] = useState<GuestCardType[]>([]);
  const target = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [name, setName] = useState(""); // 현재 페이지를 추적
  const [isOpen, setIsOpen] = useState(false);
  const [gid, setGid] = useState<number>(-1);

  const closeModal = () => {
    setIsOpen(false);
  };

  const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  useEffect(() => {
    setResults([]);
    fetchResults();
  }, []);

  // 검색 결과를 가져오는 함수
  const fetchResults = async () => {
    if (isFetching) return; // 이미 요청 중이거나 중지 상태이면 반환
    setIsFetching(true);
    try {
      const res = await axiosSemiSecureAPI.get(
        `/api/v2/guests/${id}/reservation/search?${
          name === "" ? "" : "name=" + name
        }`
      );
      setResults((prevResults) => [
        ...prevResults,
        ...res.data.result.guestList,
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFetching(false);
    }
  };

  const handleConfirmation = async (guestId: number) => {
    try {
      await toast.promise(
        axiosSemiSecureAPI.post(
          `/api/guests/${guestId}/reservation/confirmation`
        ),
        {
          loading: "예매 승인 중...",
          success: <b>예매가 승인되었습니다.</b>,
          error: <b>예매 승인 실패</b>,
        }
      );
    } catch (e) {
    } finally {
      setResults([]);
      fetchResults();
    }
  };
  const handleCancel = async () => {
    try {
      await toast.promise(
        axiosSemiSecureAPI.delete(`/api/guests/host/${gid}`),
        {
          loading: "예매 취소 중...",
          success: <b>예매가 취소되었습니다.</b>,
          error: <b>예매 취소 실패</b>,
        }
      );
    } catch (e) {
      //console.log(e);
    } finally {
      setResults([]);
      fetchResults();
      setGid(-1);
      closeModal();
    }
  };

  const onClick = () => {
    setResults([]);
    fetchResults();
  };
  return (
    <div className="flex flex-col w-full h-full mt-5">
      <SearchBox value={name} onChange={changeName} onClick={onClick} />
      <SearchResult
        isLoading={isFetching}
        results={results}
        handleCancel={handleCancel}
        handleConfirmation={handleConfirmation}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setGid={setGid}
      />
    </div>
  );
};

export default Guest;
