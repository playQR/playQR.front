import { useEffect,useState } from 'react'
import { Formik, Form, useFormikContext } from 'formik';
import * as Yup from 'yup';
import NextButton from './nextbutton';
import store from '../../../store/store';
import { CustomTextInput, CustomFileInput, CustomDateInput, CustomTimeInput } from './common/inputs';
type Props = {  
  next : () => void;
  currentIndex : number;
}


type CheckProps = {
  isValidTime : boolean;
  changeIsValid: (arg:boolean) => void;
}

type IFormInput = {
  team?:string;
  title?:string;
  imageList ?: File[] | string[];
  showDate ?: string;
  time ?: {
    smeridian ?: string;
    shour?: number;
    sminute?: number;
    lmeridian ?: string;
    lhour?: number;
    lminute?: number;
  }
  showLocation ?: string;
  maxAudience ?: number;
}
const validationSchema = Yup.object({
  team: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
  title: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
  imageList: Yup.array().min(1, '1개 이상의 파일을 업로드해주세요.'),
  showDate: Yup.string().required('필수 항목입니다.'),
  showLocation: Yup.string()
    .max(15, '15자 이내로 입력해주세요.')
    .required('필수 항목입니다.'),
  maxAudience : Yup.number().required('필수 항목입니다.')
})
const CheckIsFilled = (props:CheckProps) => {
  const { values, submitForm } = useFormikContext<IFormInput>();

  const {changeIsValid, isValidTime} = props;
  useEffect(() => {
    const allFieldsFilled = Object.values(values).every(value => value !== '');
    if (allFieldsFilled && isValidTime) {
      console.log('valid');
      changeIsValid(true);
    }
    else{
      console.log('not valid');
      changeIsValid(false);
    }
  }, [values, submitForm, isValidTime]);
  return null;
}


const Step1 = (props: Props) => {
  const {useCreatePromotionStore} = store;
  const {updateData, getFullPromotionData} = useCreatePromotionStore();
  const {next,currentIndex} = props;
  const [isValidTime,setIsValidTime] = useState(false);
  const [isValid,setIsValid] = useState(false);
  const changeIsValid = (value : boolean) => {
    setIsValid(value)
  }
  const [initialVal, setInitialVal] = useState<IFormInput>(getFullPromotionData().step1);



  return (
    <div className='w-full bg-system-white p-4'>
      <Formik
        initialValues={initialVal}
        validationSchema={validationSchema}
        onSubmit={
          (values, {setSubmitting}) => {
            console.log(values)
            setTimeout(() => {
              setSubmitting(false);
            }, 400);
            updateData({step1: values});
            next();
          }
        }>
        <Form>
          <CustomTextInput label='밴드명을 알려주세요' name='team' type='text' placeholder='밴드명 공백 포함 15자' />
          <CustomTextInput label='공연명을 알려주세요' name='title' type='text' placeholder='공연명 공백 포함 15자' />
          <CustomFileInput label='공연 포스터를 업로드 해주세요' name='imageList' type='file' placeholder='공연 포스터를 업로드 해주세요' initialval={initialVal.imageList}/>
          <CustomDateInput label='공연 일정을 알려주세요' name='showDate' type='text' placeholder='공연 일정을 알려주세요' initialval={initialVal.showDate}/>
          <CustomTimeInput label='공연 시간을 알려주세요' name='time' type='text' placeholder='공연 시간을 알려주세요' setIsValidTime={setIsValidTime} initialval={initialVal.time}/>
          <CustomTextInput label='공연장 위치를 알려주세요' name='showLocation' type='text' placeholder='정확한 위치를 입력해주세요' initialval = {initialVal.showLocation} />
          <CustomTextInput label='관객 수를 알려주세요' name='maxAudience' type='number' placeholder='숫자로 입력해주세요' initialval = {initialVal.maxAudience} />
          <CheckIsFilled changeIsValid={changeIsValid} isValidTime={isValidTime}/>
          <NextButton isValid={isValid} currentIndex={currentIndex}/>
        </Form>
      </Formik>
    </div>
  )
}

export default Step1