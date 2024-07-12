import React, { useEffect,useCallback } from 'react'
import calendar_icon from '../img/calendar_icon.png';
import location_icon from '../img/location_icon.png';
import checker_img from '../img/checker_img.png';
import { useNavigate } from 'react-router-dom';
import { PromotionCard, Ticket, ViewPromotion } from '../../../promotion/types/common';
import { convertStringToDate } from '../../../utils/time';
import { axiosAPI,axiosSemiSecureAPI } from '../../../axios';
import { useParams } from 'react-router-dom';
import QRCode from 'react-qr-code';
import TicketLoading from '../../../common/ticketloading';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

type Props = {
  
}

const QrCard : React.FC<Props> = (props: Props) => {

  const navigate = useNavigate();
  const {id} = useParams();
  const WEEKDAY = ['일', '월', '화', '수', '목', '금', '토'];
  const [promotion, setPromotion] = React.useState<PromotionCard>({
    promotionId: 0,
    title: '',
    team: '',
    thumbnail: '',
    date: '',
    location: '',
    startTime: '',
    endTime: '',
    entranceFee: 0,
    writer: {
      name: '',
      nickname: '',
      profileImg : ''
  }});
  const [ticket, setTicket] = React.useState<Ticket>({ticketId: 0, uuid: '', dueDate: ''});
  const [isPromotionLoading, setIsPromotionLoading] = React.useState<boolean>(false);
  const [isTicketLoading, setIsTicketLoading] = React.useState<boolean>(false);
  
  const fetchPromotion = async () => {
    setIsPromotionLoading(true)
          try{
            const response = await axiosAPI.get(`/api/promotions/${id}`)
            if(response.data.isSuccess === true){
                const result = response.data.result as ViewPromotion
                const {
                    promotionId,
                    title,
                    team,
                    imageList,
                    date,
                    location,
                    startTime,
                    endTime,
                    entranceFee,
                    writer: {name: writer_name, nickname: writer_nickname, profileImg: writer_profileImg},
                } = result
              
                setPromotion({
                    promotionId,
                    title,
                    team,
                    thumbnail : imageList[0],
                    date,
                    location,
                    startTime,
                    endTime,
                    entranceFee,
                    writer: {name: writer_name, nickname: writer_nickname, profileImg: writer_profileImg},
                })
              };
          }
        catch(e:any){
          alert('프로모션 정보를 불러오는데 실패했습니다. 다시 시도해주세요.')
          navigate('/')
        }finally{
          setIsPromotionLoading(false)
        }
    
  }
  const fetchTicket = useCallback(async () => {
    setIsTicketLoading(true)
    try{
      const response = await axiosSemiSecureAPI.get(`/api/tickets/promotions/${id}`)
      if (response.data.isSuccess === true){
        const result = response.data.result
        const {ticketId, uuid, dueDate} = result
        setTicket({ticketId, uuid, dueDate})
      }
    }catch(e){
      alert('티켓 정보를 불러오는데 실패했습니다. 다시 시도해주세요.')
      navigate('/')
    }finally{
      setIsTicketLoading(false)
    
    }
  },[ticket])
  const downloadImage = () => {
    if (isTicketLoading) {
      alert('QR코드를 생성중입니다. 잠시만 기다려주세요.');
      return;
    }
    if (ticket.uuid !== ''){
      const svg = document.getElementById("QRCode") as HTMLElement;
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
      const img = new Image();
      img.onload = () => {
        const margin = 100;
        canvas.width = img.width + margin * 2;
        canvas.height = img.height + margin * 2;
         // 캔버스 배경을 흰색으로 설정
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, margin, margin);
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = "QRCode";
        downloadLink.href = `${pngFile}`;
        downloadLink.click();
      };
      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }else{
      alert('티켓이 없습니다.');
    }
  } 
              
  useEffect(()=> {
    fetchPromotion()
    fetchTicket()
  },[])
  
  const onClick = () => {
    navigate(`/promotion/${promotion?.promotionId}`);
  }
  return (
    <>
    <div className="min-w-full mx-auto min-h-1/4 bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative">
        <div className="h-40 w-full flex items-center justify-center">
          <img src={promotion.thumbnail !== '' ? promotion.thumbnail : checker_img} alt="checker" className="h-full w-full object-cover" />
        </div>
        {/* <LikeButton like={true} like_num={1}/> */}
      </div>
      <div className="pt-2 px-10px">
        <h2 className="text-pxs text-text-plain">{promotion.team}</h2>
        <p className="text-plg text-text-plain">{promotion.title}</p>
      </div>
      <div className="">
        <div className='flex flex-row w-full items-center'>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
          <div className="w-full border-t border-dashed border-gray-4"></div>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
        </div>
      </div>
      <div className="pb-2 px-10px">
        <div className="flex justify-between items-center">
          <div className="flex flex-row items-center">
            <img src={location_icon} alt="calendar" className="w-4 h-4 mr-1"/>
            <div className="text-text-plain text-pxs">{promotion.location}</div>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="flex flex-row items-center">
            <img src={calendar_icon} alt="calendar" className="w-4 h-4 mr-1"/>
            <div className="text-text-plain text-pxs">{promotion.date}</div>
            <div>&nbsp;</div>
            <div className="text-text-plain text-pxs">{WEEKDAY[new Date(promotion.date).getDay()]}</div>
            <div>&nbsp;</div>
            <div className="text-text-plain text-pxs">{`${convertStringToDate(promotion.startTime)}~`}</div>
            <div className="text-text-plain text-pxs">{convertStringToDate(promotion.endTime)}</div>
          </div>
          <div className="text-plg text-primary">{`${promotion.entranceFee}₩`}</div>
        </div>
      </div>
      <div className="">
        <div className='flex flex-row w-full items-center'>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
          <div className="w-full border-t border-dashed border-gray-4"></div>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
        </div>
      </div>
      {
        isTicketLoading ? <TicketLoading text={"QR코드를 생성중입니다."} isLoading={isTicketLoading}/> :
        ticket.uuid !== '' ? 
        <div className='flex items-center justify-center w-full h-300px'>
            <QRCode
            id={"QRCode"}
            size={256}
            style={{ height: "100%", maxWidth: "80%", width: "80%" }}
            className='p-8'
            value={ticket.uuid}
            viewBox={`0 0 256 256`}
              />
            
        </div>  
          : 
      <div>
          <div className="flex flex-col items-center justify-center h-48">
            <div className="text-text-plain text-pxs">티켓이 없습니다.</div>
            <div className="text-text-plain text-pxs">티켓을 생성해주세요.</div>
        </div>
      </div>
      }
      
    </div>
    <input
        type="button"
        value="입장 QR 이미지 다운로드"
        className='w-full border-primary rounded-xl mt-4 text-primary text-pxl text-center font-normal border-1px py-4'
        onClick={() => downloadImage()}
      />
    </>
  )
}

export default QrCard