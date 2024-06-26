import React from 'react'

type Props = {
  next : () => void;
  prev : () => void;
  isFirstStep : boolean;
  isLastStep : boolean;
}

const Step3 = (props: Props) => {
  return (
    <div>Step3</div>
  )
}

export default Step3