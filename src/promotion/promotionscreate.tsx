import React,{ReactElement,useState, useEffect} from 'react'
import Nav from '../common/components/nav/nav'
import TicketCreationInfo from './components/promotionform/ticketcreationinfo'
import Step1 from './components/promotionform/step1'
import Step2 from './components/promotionform/step2'
import Step3 from './components/promotionform/step3'
import FormNav from './components/promotionform/formnav'
import Result from './components/promotionform/result';
import store from '../store/store'
import {axiosSemiSecureAPI }from '../axios'
import { convertMerdian } from '../utils/time'
import Loading from '../common/loading'
type Props = {}

type Step = {
    title: string;
    element: ReactElement;
  };

const PromotionCreate = (props: Props) => {

    const { useCreatePromotionStore } = store;
    const { getFullPromotionData,clearData } = useCreatePromotionStore();
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

    
    const submitPromotion = async () => {
      setIsLoading(true);
      const payload = getFullPromotionData();
      let formData = new FormData();
      const file = payload.step1.imageList
      if(file){
        formData.append('uploadImgFileList', file[0]);
      }else{
        alert('이미지가 없습니다.')
      }
      
      try{
        const result = await axiosSemiSecureAPI.post('/api/images', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        const refinedPayload = {
          ...payload.step1,
          ...payload.step2,
          ...payload.step3.billing,
          startTime: '',
          endTime: '',
        }

      const convertedTime = convertMerdian(refinedPayload.time)
      delete refinedPayload.time
      refinedPayload.startTime = convertedTime.startTime
      refinedPayload.endTime = convertedTime.endTime

      refinedPayload.imageList = [result.data.result[0]]
      try{
        
        const response = await axiosSemiSecureAPI.post('/api/promotions', refinedPayload);
        if(response.data.isSuccess === true){
          setPromotionUrl(`/promotion/${response.data.result}`)
          clearData();
          setIsSuccess(true);
        }
      }catch(e){
        //console.log(e)
        alert('프로모션 생성 실패')
      }
      
      
      }catch(e){
        alert('이미지 업로드 실패')
        //console.log(e)
      }
      setIsLoading(false);
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
          {!isSuccess ? isLoading ? <Loading text={"공연을 등록중입니다."} isLoading={isLoading}/> :
            step.length !== 0 ?
            step[currentStepIndex].element : <div> No Element </div>
            :
            <Result isLoading={isLoading} isSuccess={isSuccess} promotionUrl={promotionUrl}/>  
          }
        
        </div>
        
      </div>
    )
}

export default PromotionCreate