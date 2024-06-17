import React,{useState} from 'react'
import TextareaAutosize from 'react-textarea-autosize';

type Props = {}

const TalkInfo = (props: Props) => {
  const [message, setMessage] = useState('');
  const charLimit = 200;

  const handleMessageChange = (event: any) => {
    if (event.target.value.length <= charLimit) {
      setMessage(event.target.value);
    }
  };

  const handleSubmit = () => {
    // handle submit logic
    alert('Message submitted: ' + message);
  };
  return (
    <div className='w-full flex flex-col mt-5'>
      <div className='text-primary text-pxl font-semibold mb-3'>
        응원 Talk N개
      </div>
      <TextareaAutosize
          className="w-full bg-gray-700 text-gray-300 border border-gray-600 rounded-md p-3 placeholder-gray-500"
          placeholder="공연을 응원하는 메시지를 남겨보세요!"
          value={message}
          onChange={handleMessageChange}
          maxRows={4}
        />
      <div className="relative mb-3">
        
        {/* <div className="absolute bottom-3 left-3 text-xs text-gray-400">
          {message.length}/{charLimit}
        </div> */}
      </div>
      <button
        className="bg-gray-600 text-gray-300 py-2 px-4 rounded-md hover:bg-gray-500"
        onClick={handleSubmit}
      >
        등록
      </button>
      <div className='h-100px'>
                {/* 모든 정보를 보여주기 위한 마진 */}
      </div>
    </div>
  )
}

export default TalkInfo