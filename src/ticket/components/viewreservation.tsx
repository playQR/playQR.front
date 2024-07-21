import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { axiosSemiSecureAPI } from '../../axios'
import { GuestCardType, TicketCardType } from '../types'
import { PromotionCard } from '../../promotion/types/common';
import checker_img from '../components/img/checker_img.png'
import location_icon from '../components/img/location_icon.png'
import calendar_icon from '../components/img/calendar_icon.png'
import { convertStringToDate } from '../../utils/time'
import { WEEKDAY } from '../../utils/time/index';
import { GuestStatus } from '../types';
import Nav from '../../common/components/nav/nav';
import CancelModal from './modals/cancalmodal';
import CancelButton from './buttons/cancelbutton';
import CustomToast from '../../common/components/toast/customtoast';
import toast from 'react-hot-toast';
type Props = {}

type CardProps = {
    guest : GuestCardType; 
    promotion : PromotionCard;
}

const ViewReservationCard = (props:CardProps) => {
    const {guest, promotion} = props;
    
    const {title, team, thumbnail, location, date, startTime, endTime, entranceFee} = promotion;
    
    return (
    <div className="min-w-full mx-auto min-h-1/4 bg-white rounded-lg shadow-md overflow-hidden relative">
      <div className="relative">
        <div className="h-40 w-full flex items-center justify-center">
          <img src={thumbnail === '' ? checker_img : thumbnail} alt="checker" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="pt-2 px-10px">
        <h2 className="text-pxs text-text-plain">{team}</h2>
        <p className="text-plg text-text-plain">{title}</p>
      </div>
      <div className="">
        <div className='flex flex-row w-full items-center'>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
          <div className="w-full border-t border-dashed border-gray-4"></div>
          <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
        </div>
      </div>
      <div className="pb-2 px-10px flex flex-row justify-between items-center">
        <div className='flex flex-col'>
            <div className="flex justify-between items-center">
              <div className="flex flex-row items-center">
                <img src={location_icon} alt="calendar" className="w-4 h-4 mr-1"/>
                <div className="text-text-plain text-pxs">{location}</div>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center">
                <img src={calendar_icon} alt="calendar" className="w-4 h-4 mr-1"/>
                <div className="text-text-plain text-pxs">{date}</div>
                <div>&nbsp;</div>
                <div className="text-text-plain text-pxs">{WEEKDAY[new Date(date).getDay()]}</div>
                <div>&nbsp;</div>
                <div className="text-text-plain text-pxs">{`${convertStringToDate(startTime)}~`}</div>
                <div className="text-text-plain text-pxs">{convertStringToDate(endTime)}</div>
              </div>
            </div>
          </div>
          <div className="text-plg text-primary">{`${entranceFee}₩`}</div>
        </div>
        <div className="">
            <div className='flex flex-row w-full items-center'>
            <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '0 16px 16px 0' }}></div>
            <div className="w-full border-t border-dashed border-gray-4"></div>
            <div className="w-2 h-4 bg-gray-4" style={{ borderRadius: '16px 0 0 16px' }}></div>
            </div>
        </div>
        <div className='w-full flex flex-row items-center justify-between px-10px mb-3'>
            <div className='flex flex-col'>
                <div className='text-pxs text-text-disabled text-left'>
                    입금자명
                </div>
                <div className='text-pxl text-text-plain text-left'>
                    {guest.name}
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='text-pxs text-text-disabled text-left'>
                    예매날짜
                </div>
                <div className='text-pxl text-text-plain text-left'>
                    {guest.depositDate}
                </div>
            </div>
            <div className='flex flex-col'>
                <div className='text-pxs text-text-disabled text-left'>
                    매수
                </div>
                <div className='text-pxl text-text-plain text-left'>
                    {guest.reservationCount}
                </div>
            </div>
        </div>
      </div>
  )
}

const ViewReservation = (props: Props) => {

    const {pid,gid} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [result, setResult] = React.useState<TicketCardType>(
        {
            guest: {
                guestId: 0,
                name: '맛있는 사자',
                reservationCount: 0,
                reservationStatus: GuestStatus.AFTER_CONFIRMATION,
                depositDate: '2024-01-01',
                writer: {
                    id: -1,
                    name: '',
                    nickname: '',
                    profileImg: ''
                }
            },
            promotion: {
                promotionId: 0,
                title: '',
                team: '',
                thumbnail: '',
                location: '',
                date: '',
                startTime: '',
                endTime: '',
                entranceFee: 0,
                like: false,
                likecount : 0,
                writer: {
                    name: '',
                    nickname: '',
                    profileImg: ''
                }
            }
        }
    );

    

    const fetchData = async () => {
        setIsLoading(true)
        try{
            const [guestResponse, promotionResponse] = await Promise.all([
                axiosSemiSecureAPI.get(`/api/guests/${gid}`),
                axiosSemiSecureAPI.get(`/api/promotions/${pid}`)
            ]);

            if (guestResponse.data.isSuccess && promotionResponse.data.isSuccess) {
                setResult({
                    guest: guestResponse.data.result,
                    promotion: {
                      ...promotionResponse.data.result,
                      thumbnail : promotionResponse.data.result.imageList[0]
                    }
                });
            } else {
                
                console.error('Error: One or both API calls failed.');
            }
        }catch(e){
            //console.log(e)
        }
        setIsLoading(false)
    }
    useEffect(()=>{
        
        fetchData();
    },[])
    
    const cancelPromotion = async () => {
        try {
            await toast.promise(
                axiosSemiSecureAPI.delete(`/api/guests/guest/${gid}`),
                {
                loading: '예매 취소중..',
                success: <b>예매 취소 성공</b>,
                error: <b>예매 취소 오류</b>,
                }
            ).then(()=>{
                navigate('/ticket');
            }).catch((e)=>{
                //console.log(e);
            })
            
        } catch (e) {
            //console.log(e);
        }
    }
    return (
        <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
                <Nav/>
                <div className='font-bold'>
                    <div className ='text-system-white font-semibold text-ptitle mb-5'>
                            나의 예매 확인하기
                        </div>
                </div>
                <ViewReservationCard guest = {result.guest} promotion = {result.promotion}/>
                <CancelModal gid={Number(gid)} isOpen={isOpen} setIsOpen={setIsOpen} cancelPromotion={cancelPromotion}/>
                <CancelButton setIsOpen={setIsOpen}/>
                <CustomToast/>
        </div>
  )
}

export default ViewReservation