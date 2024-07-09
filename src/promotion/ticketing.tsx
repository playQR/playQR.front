import {useEffect, useState} from 'react'
import SearchCard from './components/ticketing/searchcard'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { ViewPromotion, PromotionCard, InfoType } from './types'
import { axiosAPI } from '../axios'
import { Title } from './components/ticketing/title'
import { InfoTable } from './components/ticketing/infotable'
import { TicketingForm } from './components/ticketing/ticketingform'
import Nav from '../common/components/nav/nav'
import Footer from '../common/components/footer'
import Warning from './components/common/warning'
import Loading from '../common/loading'
import Result from './components/ticketing/result'
import { axiosSecureAPI } from '../axios'
import Line from '../common/components/line/line'
type Props = {
}
type Request = {
  name : string;
  reservationCount : number;
  depositDate : string;
}

const Ticketing = (props: Props) => {
    const { id } = useParams()
    const navigate = useNavigate();
    const [result, setResult] = useState<ViewPromotion|null>(null);
    const [info, setInfo] = useState<InfoType>({bankName:'', entranceFee:0, account:'', accountHolder:'', refundInfo:''});
    const [card, setCard] = useState<PromotionCard>({promotionId:0, title:'', team:'', thumbnail:'', date:'', location:'', startTime:'', endTime:'', entranceFee:0, writer:{name:'', nickname:'', profileImg:''}});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [ticketUrl, setTicketUrl] = useState<string>('/ticket');
    const fetchData = async () => {
      try{
        const response = await axiosAPI.get(`/api/promotions/${id}`)
        if(response.data.isSuccess === true){
          const resdata = response.data.result
          setInfo({
            bankName: resdata.bankName,
            entranceFee: resdata.entranceFee,
            account: resdata.account,
            accountHolder: resdata.accountHolder,
            refundInfo: resdata.refundInfo
          })
          ;
          setCard(
            {
              promotionId: resdata.promotionId,
              title: resdata.title,
              team: resdata.team,
              thumbnail: resdata.imageList[0],
              date: resdata.date,
              location: resdata.location,
              startTime: resdata.startTime,
              endTime: resdata.endTime,
              entranceFee: resdata.entranceFee,
              writer: {
                name: resdata.writer.name,
                nickname: resdata.writer.nickname,
                profileImg: resdata.writer.profileImg
              }
            }
            
          )}
          
        }
      catch(e:any){
        // console.log(e)
        alert('정보를 불러오는데 실패했습니다. 다시 시도해주세요.')
        navigate('/')
      }
    }

    useEffect(()=>{
      setIsLoading(true);
      fetchData()
      setIsLoading(false);
    },[])
    const onSubmit = async (values : Request) => {
        setIsSubmitting(true);
        try{
          const res = await axiosSecureAPI.post(`/api/guests/${id}`,
            values
          )
          if(res.data.isSuccess){ 
            const ticketid = res.data.result;
            setTicketUrl(`/ticket/${ticketid}`)
            setIsSuccess(true);
          }
        }catch(e){
            console.log(e);
        }finally{
          setIsSubmitting(false);
        }
    }
  return (
    <div className="flex flex-col min-h-screen justify-start bg-system-background pt-20px">
        <div className='px-4'>
            <Nav/>
            <Title/>
            {isSuccess ? <Result isLoading={isSubmitting} isSuccess={isSuccess} ticketUrl={ticketUrl} /> : 
              isSubmitting ? <Loading isLoading={isSubmitting} text='예매 진행중' /> : <div className="w-full">
              <SearchCard result={card} isLoading={isLoading}/>
              <InfoTable info={info}/>
              <Line/>
              <div className='mt-3'>
                  <TicketingForm 
                  onSubmit={onSubmit}
                  id={Number(id)}/>
              </div>
              <Line/>
              <div className='px-4'>
                <div className='flex flex-col w-full'>
                  <div className='text-system-white text-plg mb-10px'>
                    환불 정보
                  </div>
                  <div className='text-system-white text-pmd mb-5'>
                    {info.refundInfo}
                  </div>
                    <Warning/>
                </div>
              </div>
              </div>
            }
        </div>
        <Footer/>
    </div>
  )
}

export default Ticketing