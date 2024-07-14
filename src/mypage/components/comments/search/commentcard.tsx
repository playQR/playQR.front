import React,{useRef,useEffect,useState} from 'react'
import { MyComments } from '../../../types';
import store from '../../../../store/store';
import { convertformatDate } from '../../../../utils/time';
import deleteIcon from '../../../img/delete_icon.png'

type Props = {
    result : MyComments;
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
    setCommentId : React.Dispatch<React.SetStateAction<number>>;
}

const CommentCard = (props: Props) => {
    const {content, createdTime, id}= props.result
    const {setIsOpen, setCommentId} = props;
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);
    const {useUserStore} =store;
    const {user} = useUserStore();

     useEffect(() => {
      if (contentRef.current) {
            setContentHeight(contentRef.current.clientHeight);
      }
    }, [props.result]);

        return (
          <div className="w-full flex flex-col items-start">
                  <div className="flex flex-row items-between w-full">
                    <div className='flex flex-row items-start w-full'>
                    <div className=''>
                      {
                        user?.profileImage == null ? 
                        <div
                          className="bg-white rounded-full mr-10px"
                          style={{
                            width: `${contentHeight-2.5}px`, // Dynamic width based on the content height
                            height: `${contentHeight-2.5}px`, // Dynamic height
                          }}
                        /> : 
                        <div>
                          <img
                            src={user.profileImage}
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
                      <div className="text-xs text-gray-1">{user?.name}</div>
                      <div className="text-xs text-gray-2">{convertformatDate(createdTime)}</div>
                    </div>
                    </div>
                    <img onClick={()=>{setIsOpen(true); setCommentId(id)}} src={deleteIcon} className='w-5 h-5'/>
                  </div>
                  <div className="text-xs mt-10px text-system-white">{content}</div>
                  {/* {index < comments.length - 1 && (<div className='w-full h-0.4px my-10px bg-gray-4'></div>
                  )} */}
                
                </div>
  )
}

export default CommentCard