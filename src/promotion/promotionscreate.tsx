import React,{ReactElement,useState, useEffect} from 'react'
import Nav from '../common/components/nav/nav'
import TicketCreationInfo from './components/promotionform/ticketcreationinfo'
import Step1 from './components/promotionform/step1'
import Step2 from './components/promotionform/step2'
import Step3 from './components/promotionform/step3'
import FormNav from './components/promotionform/formnav'
import Result from './components/promotionview/result';
import store from '../store/store'
import axiosSecureAPI from '../axios'
type Props = {}

type Step = {
    title: string;
    element: ReactElement;
  };

const PromotionCreate = (props: Props) => {

    const { useCreatePromotionStore } = store;
    const { getFullPromotionData } = useCreatePromotionStore();
    const [promotionUrl, setPromotionUrl] = useState<string>('/');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    
    const prev = () => {
      setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
    };

    const next = () => {
      setCurrentStepIndex((index) => (index >= 2 ? index : index + 1));
      if(currentStepIndex+1 == 3){
        submitPromotion();
      }
    };

    const convertMerdian = (time : any) => {
      const sm = time.smeridian;
      const lm = time.lmeridian;
      const sh = time.shour;
      const lh = time.lhour;
      if (sm === '오후' && sh !== 12) {
        time.shour = sh + 12;
      }
      if (lm === '오후' && lh !== 12) {
        time.lhour = lh + 12;
      }
      if (sm === '오전' && sh === 12) {
        time.shour = 0;
      }
      if (lm === '오전' && lh === 12) {
        time.lhour = 0;
      }
      delete time.smeridian;
      delete time.lmeridian;
      return time;
    }
    const submitPromotion = async () => {
      const payload = getFullPromotionData();
      let formData = new FormData();
      const file = payload.step1.imageList
      if(file){
        formData.append('uploadImgFileList', file[0]);
      }else{
        alert('이미지를 업로드해주세요')
      }
      
      try{
        const result = await axiosSecureAPI.post('/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        alert('이미지 업로드 성공')
        const refinedPayload = {
        ...payload.step1,
        ...payload.step2,
        ...payload.step3
      }
      refinedPayload.time = convertMerdian(refinedPayload.time)
      refinedPayload.imageList = result.data.result[0]
      console.log(refinedPayload)
      setIsSuccess(true);
      }catch(e){
        alert('이미지 업로드 실패')
        console.log(e)
      }
      
      
      // await axiosSecureAPI.post('/api/promotions').then((res)=>{
      //   if(res.status === 200 || res.data.isSuccess==true){
      //     setSubmitSuccess(true);
      // }}).catch((err)=>{
      //   console.log(err)
      //   alert(err)
      // })
    }

    const [step, setStep] = useState<Step[]>([])
    useEffect(() => {
        setStep([
            {
                title: 'STEP 1 공연 정보',
                element: <Step1 next={next} currentIndex={currentStepIndex} />,
            },
            {
                title: 'STEP 2 상세 정보',
                element: <Step2 prev={prev} next={next} currentIndex={currentStepIndex} />,
            },
            {
                title: 'STEP 3 예매 정보',
                element: <Step3 prev={prev} next={next} currentIndex={currentStepIndex} />,
            },
        ]);
    }, [currentStepIndex]);

    const title = step.map((s) => s.title);
    return (
      <div className="flex flex-col min-h-screen justify-start bg-system-background pt-20px">
        <div className='px-4'>
          <Nav/>
          <TicketCreationInfo/>
        </div>
        <div className="flex flex-col w-full">
          <FormNav title={title} currentStepIndex={currentStepIndex}/>
          {!isSuccess ?
            step.length !== 0 ?
            step[currentStepIndex].element : <div> No Element </div>
            :
            isLoading ? <div>loading...</div> :
            <Result isLoading={isLoading} isSuccess={isSuccess} promotionUrl={promotionUrl}/>  
            }
        
        </div>
        
      </div>
    )
}

export default PromotionCreate