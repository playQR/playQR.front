import React,{useState ,useRef, useEffect} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import { CommentType } from './types';
type Props = {
  comment : CommentType[]
}

const TalkInfo = (props: Props) => {
  const [message, setMessage] = useState('');
  const charLimit = 200;
  const ellipsisRef = useRef(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const handleMessageChange = (event: any) => {
    
      setMessage(event.target.value);
    
  };

  const handleSubmit = () => {
    // handle submit logic
    alert('Message submitted: ' + message);
  };

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.clientHeight);
    }
  }, [props.comment]);

  return (
    <div className='w-full flex flex-col mt-5'>
      <div className='text-primary text-pxl font-semibold mb-3'>
        {`응원 Talk ${props.comment.length}개`}
      </div>
      <div className='w-full flex flex-col mb-34px'>
        <TextareaAutosize
            className="w-full bg-gray-4 text-gray-3 rounded-t-md p-3 placeholder-gray-3"
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
                className="bg-gray-3 text-xs h-22px px-10px rounded-5px text-gray-1 rounded-sm" onClick={handleSubmit}>
                등록
              </button>
            </div>
          </div>
      </div>
      
      <div className="mb-3">
        {props.comment.map((comment, index) => {
          return( <div key={index} className="w-full flex flex-col items-start ">
            <div className="flex flex-row">
              <div>
                 <div
                    className="bg-white rounded-full mr-10px"
                    style={{
                      width: `${contentHeight-2.5}px`, // Dynamic width based on the content height
                      height: `${contentHeight-2.5}px`, // Dynamic height
                    }}
                  />
              </div>
              <div className="flex flex-col items-start" ref={contentRef as React.RefObject<HTMLDivElement>}>
                <div className="text-xs text-gray-1">{comment.nickname}</div>
                <div className="text-xs text-gray-2">{comment.comment_date}</div>
              </div>
            </div>
            <div className="text-xs mt-10px text-system-white">{comment.comment_content}</div>
            {index < props.comment.length - 1 && (
                                        <div className='w-full h-0.4px my-10px bg-gray-4'></div>
            )}
          </div>
          )
})}
        
      </div>
      
      <div className='h-100px'>
                {/* 모든 정보를 보여주기 위한 마진 */}
      </div>
    </div>
  )
}

export default TalkInfo