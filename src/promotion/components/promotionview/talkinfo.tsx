import React,{useState ,useRef, useEffect, useCallback} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { Comment, Member } from '../../types';
import {axiosSemiSecureAPI } from '../../../axios';
import Loading from '../../../common/loading';
import { convertformatDate } from '../../../utils/time/index';
import toast from 'react-hot-toast';
import deleteIcon from '../../img/delete_icon.png';
import DeleteModal from '../../modals/deletemodal';
import store from '../../../store/store';
type Props = {
  promotionId : number;
  writer: Member;
  isAuthenticated: boolean;
  memberInfo: Member;
}

const TalkInfo = (props: Props) => {
  const [message, setMessage] = useState('');
  const { promotionId,writer } = props;
  const [commentId, setCommentId] = useState<number>(-1);
  const charLimit = 200;
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const target = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);
  const [stop, setStop] = useState(false);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {useModalStore} = store;
  const { openModal } = useModalStore();
  const { isAuthenticated,memberInfo } = props;
  const [maxLength, setMaxLength] = useState(0);

  const fetchResults = useCallback(async () => {
        if (isFetching || stop) return;// 이미 요청 중이거나 중지 상태이면 반환
        setIsFetching(true);
        try {
            const res = await axiosSemiSecureAPI.get(`/api/comments/${promotionId}?currentPage=${page}`);
            const commentResult = res.data.result.commentList;
            setMaxLength(res.data.result.totalCount)
            if (commentResult.length === 0) {
                setStop(true); // 더 이상 데이터가 없으면 중지 상태로 설정
            }
            else {
                // 더 이상 데이터가 없는 경우 2
                if(commentResult.length > 0 && commentResult.length < 5) {
                  setStop(true);
                }
                
                setComments((prevResults) => [...prevResults, ...res.data.result.commentList]);
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

  const handleMessageChange = (event: any) => {
      setMessage(event.target.value);
  };

  const handleSubmit = async () => {
    if(message.length === 0)return;
    if(isAuthenticated === false){
      openModal();
    }
    else{
      try {
        await toast.promise(
          axiosSemiSecureAPI.post(`/api/comments/${promotionId}`, {
            content: message,
          }),
          {
            loading: '댓글 게시중...',
            success: <b>댓글이 게시되었습니다.</b>,
            error: <b>댓글 게시 실패</b>,
          }
          
      );
      setMessage('');
    } catch (e) {
      //console.log(e);
    }
    
      setComments([]);
      setPage(0);
      setStop(false);
    }
  };
  
  const handleDelete  = (id : number) => {
    setCommentId(id);
    setIsModalOpen(true);
  }
  
  const deleteComment = async () => {
    try {
      await toast.promise(
        axiosSemiSecureAPI.delete(`/api/comments/${commentId}`),
        {
          loading: '댓글 삭제중...',
          success: <b>댓글이 삭제되었습니다.</b>,
          error: <b>댓글 삭제 실패</b>,
        }
    );
  } catch (e) {
    //console.log(e);
  }
    
    setComments([]);
    setPage(0);
    setStop(false);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [comments]);

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className='w-full flex flex-col mt-5'>
      
      <div className='text-primary text-pxl font-semibold mb-3'>
        {`응원 Talk ${maxLength}개`}
      </div>
      <div className='w-full flex flex-col mb-34px'>
        <TextareaAutosize
            className="w-full bg-gray-4 rounded-t-md p-3 placeholder-gray-3 text-system-white"
            placeholder="공연을 응원하는 메시지를 남겨보세요!"
            value={message}
            onChange={handleMessageChange}
            maxRows={4}
          />
          <div className='w-full flex flex-row justify-between bg-gray-4 px-10px py-6px rounded-b-md'>
            <div className="text-xs text-gray-400">
              {message.length}/{charLimit}
            </div>
            <div className='flex justify-center items-center'>
              <button
                className="bg-gray-3 text-xs h-22px px-10px rounded-sm text-gray-1 hover:bg-gray-2" onClick={handleSubmit}>
                등록
              </button>
            </div>
          </div>
      </div>
      
      <div className="mb-3">

        {comments.length >= 0 ? comments.map((comment, index) => {
          return( <div key={index} className="w-full flex flex-col items-start">
            <div className="flex flex-row items-between w-full">
              <div className='flex flex-row items-start w-full'>
              <div className=''>
                {
                  comment.memberResponse.profileImg == null ? 
                  <div
                    className="bg-white rounded-full mr-10px"
                    style={{
                      width: `${contentHeight-2.5}px`, // Dynamic width based on the content height
                      height: `${contentHeight-2.5}px`, // Dynamic height
                    }}
                  /> : 
                  <div>
                    <img
                      src={comment.memberResponse.profileImg}
                      alt="profile"
                      className="w-40px h-40px rounded-full mr-10px"
                      style={{
                      width: `${contentHeight-2.5}px`, // Dynamic width based on the content height
                      height: `${contentHeight-2.5}px`, // Dynamic height
                    }}
                    />
                  </div>
                }
                
              </div>
              <div className="flex flex-col items-start" ref={contentRef as React.RefObject<HTMLDivElement>}>
                <div className="text-xs text-gray-1">{comment.memberResponse.name}</div>
                <div className="text-xs text-gray-2">{convertformatDate(comment.createdTime)}</div>
              </div>
              </div>
              {isAuthenticated && memberInfo.id === comment.memberResponse.id ? <img onClick={()=>handleDelete(comment.id)} src={deleteIcon} className='w-5 h-5'/> : <div></div>}
            </div>
            <div className="text-xs mt-10px text-system-white">{comment.content}</div>
            {index < comments.length - 1 && (<div className='w-full h-0.4px my-10px bg-gray-4'></div>
            )}
           
          </div>
          )
        }): <div className='text-gray-1 text-pmd w-full text-center'>댓글이 없습니다.</div>}
        
      </div>
      <div ref={target} style={{ height: '1px' }}></div>
      {isFetching && <Loading text={"댓글을 가져오는 중입니다."} isLoading={isFetching}/>}
      <div className='h-100px'>
                {/* 모든 정보를 보여주기 위한 마진 */}
      </div>
       <DeleteModal deleteComment={deleteComment} isOpen={isModalOpen} closeModal={closeModal} commentId={commentId}/>
    </div>
  )
}

export default TalkInfo