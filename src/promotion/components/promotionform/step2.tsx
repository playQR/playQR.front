import React from 'react'

type Props = {
  next : () => void;
  prev : () => void;
  isFirstStep : boolean;
  isLastStep : boolean;
}

const Step2 = (props: Props) => {
  return (
    <div>Step2</div>
  )
}

export default Step2