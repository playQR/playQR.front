import React,{useState, useEffect} from 'react'
import sample_image_lg from '../../img/sample_image_lg.png'
import location_icon_white from '../../img/location_icon_white.png'
import calendar_icon_white from '../../img/calendar_icon_white.png'
import { Member, ViewPromotion } from '../../types';
import ShowInfo from './showinfo'
import TalkInfo from './talkinfo'
import { convertStringToDate } from '../../../utils/time';
import Loading from '../../../common/loading';
import { axiosAPI, axiosSemiSecureAPI } from '../../../axios';
import toast from 'react-hot-toast';
import store from '../../../store/store';
import share_icon from '../../img/share.png'
import { shareKakao } from '../../../utils/kakao/shareKakao';
type Props = {
  result : ViewPromotion;
  isLoading : boolean;
  isAuthenticated : boolean;
  memberInfo : Member;
  id : number;
  setPromotionInfo : any;
}

const PromotionInfo = (props: Props) => {

  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];

  const { 
    promotionId,
    title,
    content,
    team,
    entranceFee,
    date,
    startTime,
    endTime,
    location,
    refundInfo,
    writer,
    musicList,
    imageList,
  } = props.result;
  

  const { useModalStore} = store;

  const { isAuthenticated,memberInfo,setPromotionInfo } = props;
  const { openModal } = useModalStore();
  
  
  const [isLeft, setIsLeft] = React.useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
  const [preview, setPreview] = useState<string| null>(null);
  const [showFullScreen, setShowFullScreen] = useState<boolean>(false);
  const [currentPreview, setCurrentPreview] = useState<string | null>(null);

  const updateLikeStatus = async (musicId: number) => {
    try {

      // 좋아요 수 가져오기
      const responseLikeCount = await axiosAPI.get(`/api/likes/music/${musicId}/count`);
      const likeCount = responseLikeCount.data.isSuccess ? responseLikeCount.data.result : 0;

      // 좋아요 상태 가져오기
      let songLike = false;
      if (isAuthenticated) {
        try {
          const responseLikeStatus = await axiosSemiSecureAPI.get(`/api/likes/music/${musicId}`);
          songLike = responseLikeStatus.data.isSuccess ? responseLikeStatus.data.result : false;
        } catch (error) {
          songLike = false;
        }
      }
      const data = {
        liked: songLike,
        count: likeCount,
      }
      setPromotionInfo((prev:ViewPromotion) => {
        return {
          ...prev,
          musicList: prev.musicList.map((music) => {
            if (music.id === musicId) {
              return {
                ...music,
                musicLikeInfo:data
              };
            }
            return music;
          }),
        }})
      
    } catch (e) {
      //console.log(e)
    } finally {
      setIsLikeLoading(false);
    }
  };
  const updateHeart = async (id:any, value : boolean) =>{
    if(isLoading) return;
    if(isLikeLoading) return;
    if(isAuthenticated){
      setIsLikeLoading(true);
      if (value) {
        try {
            await toast.promise(
              axiosSemiSecureAPI.delete(`/api/likes/music/${id}`),
              {
                loading: '좋아요 처리중..',
                success: <b>좋아요가 취소되었습니다.</b>,
                error: <b>좋아요를 처리할 수 없습니다.</b>,
              }
          );
        } catch (e) {
          //console.log(e);
        }
        finally{
          updateLikeStatus(id);
        }
      }
      else{
        try {
            await toast.promise(
              axiosSemiSecureAPI.post(`/api/likes/music/${id}`),
              {
                loading: '좋아요 처리중..',
                success: <b>좋아요가 완료되었습니다.</b>,
                error: <b>좋아요를 처리할 수 없습니다.</b>,
              }
          );
        } catch (e) {
          //console.log(e);
        }finally{
          updateLikeStatus(id);
        }
      }
    }else{
      openModal();
    }
  }

  const onLeftClick = () => {
    setIsLeft(true);
  };

  const onRightClick = () => {
    setIsLeft(false);
  };
  const onShareClick = () => {
    
    shareKakao(props.id);
  }

  return (
    props.isLoading ? <Loading isLoading={props.isLoading} text={'정보를 가져오는 중입니다.'}/> :
    <div className='w-full'>
      <img className='object-cover w-full mt-18px h-350px'
        onClick={() => {
                  setCurrentPreview(preview);
                  setShowFullScreen(true);
                }}
       src={imageList !== undefined ? imageList[0] : sample_image_lg}/>
      
      <div className='w-full mt-10px'>
        <div className='text-plg text-system-white'>{team}</div>
        <div className='flex flex-row justify-between w-full align-top'>
          <div className='font-semibold text-ptitle text-system-white'>{title}</div>
          <img src={share_icon} className='w-8 h-8' onClick={onShareClick}></img>
          </div>
      </div>
        
     
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              <img src={location_icon_white} alt="location" className="w-4 h-4 mr-1"/>
              <div className="text-gray-2 text-psm">{location}</div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center">
              <img src={calendar_icon_white} alt="calendar" className="w-4 h-4 mr-1"/>
              <div className="text-gray-2 text-psm">{date}</div>
              <div>&nbsp;</div>
              <div className="text-gray-2 text-psm">{WEEKDAY[new Date(date).getDay()]}</div>
              <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row items-center">
                <div>&nbsp;</div>
                <div className="text-gray-2 text-psm">{`${convertStringToDate(startTime)}~`}</div>
                <div className="text-gray-2 text-psm">{convertStringToDate(endTime)}</div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <div className="font-semibold text-ptitle text-primary">{`${entranceFee}₩`}</div>
      </div>
      <div className="flex flex-row w-full h-10 mt-5">
        <div onClick={onLeftClick} style={{ background: isLeft ? "#474747" : "#2A2A2A" }} className="flex items-center justify-center w-1/2 rounded-l-xl">
          <div className="text-white text-pmd">공연 정보</div>
        </div>
        <div onClick={onRightClick} style={{ background: !isLeft ? "#474747" : "#2A2A2A" }} className="flex items-center justify-center w-1/2 rounded-r-xl">
          <div className="text-white text-pmd">응원 Talk</div>
        </div>
      </div>
      {
        isLeft ? (
          <ShowInfo
            musicList={musicList}
            content={content}
            refundInfo={refundInfo}
            updateHeart={updateHeart}
          />
        ) : (
          <TalkInfo
            writer={writer}
            isAuthenticated={isAuthenticated}
            promotionId = {promotionId}
            memberInfo={memberInfo}/>
        )
      }
      {showFullScreen && currentPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <button
            className="absolute text-2xl text-white top-4 right-4"
            onClick={() => {
              setShowFullScreen(false);
              setCurrentPreview(null);
            }}
          >
            X
          </button>
          <img src={currentPreview} alt="fullscreen preview" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
}

export default PromotionInfo