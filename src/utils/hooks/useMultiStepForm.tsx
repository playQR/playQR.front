import {useState,ReactElement} from 'react'
type StepProp = {
  title: string;
  element: ReactElement;
};

const useMultiStepForm = (steps: StepProp[]) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const prev = () => {
    setCurrentStepIndex((index) => (index <= 0 ? 0 : index - 1));
  };

  const next = () => {
    setCurrentStepIndex((index) => (index >= steps.length - 1 ? index : index + 1));
  };
  const title = steps.map((step) => step.title);

  return {
    currentStepIndex,
    currentTitle: steps[currentStepIndex].title,
    currentStep: steps[currentStepIndex].element,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    prev,
    next,
    title,
  };
}

export default useMultiStepForm;