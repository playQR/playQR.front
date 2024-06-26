import React,{ReactElement,useState} from 'react'
import Nav from '../common/components/nav/nav'
import TicketCreationInfo from './components/promotionform/ticketcreationinfo'
import Step1 from './components/promotionform/step1'
import Step2 from './components/promotionform/step2'
import Step3 from './components/promotionform/step3'
import useMultiStepForm from '../utils/hooks/useMultiStepForm'
import FormNav from './components/promotionform/formnav'
import BackButton from './components/promotionform/backbutton'
import NextButton from './components/promotionform/nextbutton'
type Props = {}

const PromotionCreate = (props: Props) => {

    const [isValid, setIsValid] = React.useState(false);
    
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    
    const prev = () => {
      setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
    };

    const next = () => {
      setCurrentStepIndex((index) => (index >= step.length - 1 ? index : index + 1));
    };
    const [step, setStep] = React.useState([
    {
      title: 'STEP 1 공연 정보',
      element: <Step1 next={next} isLastStep={currentStepIndex === 3}/>,
    },

    {
      title: 'STEP 2 상세 정보',
      element: <Step2 prev={prev} next={next} isFirstStep={currentStepIndex===0} isLastStep={currentStepIndex === 3}/>,
    },
    {
      title: 'STEP 3 예매 정보',
      element: <Step3 prev={prev} next={next} isFirstStep={currentStepIndex===0} isLastStep={currentStepIndex === 3}/>,
    },
    ])

    const title = step.map((s) => s.title);
  return (
    <div className="flex flex-col min-h-screen justify-start bg-system-background pt-20px">
      <div className='px-4'>
        <Nav/>
        <TicketCreationInfo/>
      </div>
      <div className="flex flex-col w-full">
        <FormNav title={title} currentStepIndex={currentStepIndex}/>
          {step[currentStepIndex].element}
      </div>
      
    </div>
  )
}

export default PromotionCreate