import React, { useState } from 'react';
import Step1 from './components/step1';
interface FormData {
  textInput1: string;
  textInput2: string;
  images: Array<string>; // 이미지 파일의 URL을 저장
  date: Date;
  startTime: Date;
  endTime: Date;
  textInput3: string;
}

interface StepProps {
  formData: FormData;
  setFormData: (formData: FormData) => void;
  nextStep: () => void;
}


const CreateTicket: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    textInput1: '',
    textInput2: '',
    images: [],
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    textInput3: ''
  });

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const totalSteps = 3; // 총 단계 수 설정

  return (
    <div>
      {currentStep === 1 && (
        <Step1 formData={formData} setFormData={setFormData} nextStep={nextStep} />
      )}
      {/* 추가 단계 컴포넌트 렌더링 */}
      {currentStep > 1 && <button onClick={previousStep}>Previous</button>}
      {currentStep === totalSteps && <button onClick={() => console.log(formData)}>Submit</button>}
    </div>
  );
};

export default CreateTicket;
