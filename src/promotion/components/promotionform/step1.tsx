import React, { useEffect,useState, useRef } from 'react'
import { Formik, Form, useFormikContext, } from 'formik';
import * as Yup from 'yup';
import NextButton from './nextbutton';
import { CustomTextInput, CustomFileInput, CustomDateInput, CustomTimeInput } from './common/inputs';

type Props = {  
  next : () => void;
  isLastStep : boolean;
}
type CheckProps = {
  changeIsValid: (arg:boolean) => void;
}
type IFormInput = {
  team:string;
  title:string;
  imageList : string[] | undefined;
  date : string;
  location : string;
}

const initialValues: IFormInput = {
  team:'',
  title:'',
  imageList : [],
  date : '',
  location : '',
}

const validationSchema = Yup.object({
  team: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
  title: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
  date: Yup.string()
    .required('필수 항목입니다.'),
  location: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
})

const CheckIsFilled = (props:CheckProps) => {
  const { values, submitForm } = useFormikContext<IFormInput>();

  const {changeIsValid} = props;
  useEffect(() => {
    const allFieldsFilled = Object.values(values).every(value => value !== '');
    if (allFieldsFilled) {
      changeIsValid(true);
    }
    else{ 
      changeIsValid(false);
    }
  }, [values, submitForm])
  return null;
}

const Step1 = (props: Props) => {

  const {next,isLastStep} = props;
  const [isValid,setIsValid] = useState(false);
  const changeIsValid = (value : boolean) => {
    setIsValid(value)
  }

  return (
    <div className='w-full bg-system-white p-4'>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={
          (values, {setSubmitting}) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }
        }>

        <Form>
          <CustomTextInput label='밴드명을 알려주세요' name='team' type='text' placeholder='밴드명 공백 포함 15자' />
          <CustomTextInput label='공연명을 알려주세요' name='title' type='text' placeholder='공연명 공백 포함 15자' />
          <CustomFileInput label='공연 포스터를 업로드 해주세요' name='imageList' type='file' placeholder='공연 포스터를 업로드 해주세요'/>
          <CustomDateInput label='공연 일정을 알려주세요' name='date' type='text' placeholder='공연 일정을 알려주세요' />
          <CustomTimeInput label='공연 시간을 알려주세요' name='time' type='text' placeholder='공연 시간을 알려주세요' />
          <CustomTextInput label='공연장 위치를 알려주세요' name='location' type='text' placeholder='정확한 위치를 입력해주세요' />
          <CheckIsFilled changeIsValid={changeIsValid}/>
          <NextButton isValid={isValid} isLastStep={isLastStep} next={next}/>
        </Form>
        
      </Formik>
    </div>
  )
}

export default Step1