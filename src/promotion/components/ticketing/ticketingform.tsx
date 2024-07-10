import { useState } from 'react';
import { Formik, Form,Field,FieldProps,ErrorMessage } from 'formik'
import { CustomTextInput, CustomDateInput, CustomDateInputTicket, CustomTextInputDark} from '../../components/promotionform/common/inputs'
import * as Yup from 'yup'
import BottomButton from './bottombutton';
import { axiosSecureAPI } from '../../../axios';
import { error } from 'console';
import { useField } from 'formik';

type Prop={
  id : number;
  onSubmit : (req : Request) => void;
}
type Request = {
  name : string;
  reservationCount : number;
  depositDate : string;
}

const CustomToggleSwitch: React.FC<FieldProps> = ({ field, form }) => {
  return (
    <label className="">
      <input
        type="checkbox"
        className="opacity-0 w-0 h-0"
        {...field}
        checked={field.value}
      />
      <button
        className={`rounded-xl border-1px text-psm font-normal p-14px ${field.value ? 'text-primary border-primary': 'text-gray-2 border-gray-2'} transition-colors duration-300 ease-in-out`}
       type='button'
       onClick={() => {form.setFieldValue(field.name, !field.value);}}>
            ✓&nbsp;입금을 완료했습니다.
        </button>
    </label>
  );
};

const CustomCouterSwitch: React.FC<FieldProps> = ({ field, form }) => {
    const [error, setError]=useState(false)
  
    return(
        <div>
            <div className='flex flex-row items-center justify-items-center'>
                <button type='button' className='text-gray-3 text-ptitle'
                onClick={()=>{
                  
                 if (field.value <= 1) {
                    form.setFieldError(field.name, '1매 이상 예매 가능합니다');
                    setError(true)
                  } else {
                      form.setFieldValue(field.name, field.value - 1);
                      setError(false)
                  }
                }}>-</button>
                <div className='text-system-white text-pxl mx-3'>
                    {field.value}
                </div>
                <button type='button' className='text-gray-3 text-ptitle'
                onClick={
                    ()=>{
                        form.setFieldValue(field.name, field.value+1);
                        setError(false)
                    }
                }>+</button>
            </div>
            <div className={`${error ? 'visible' : 'invisible'} text-red-500 text-psm`}>
              1매 이상 예매 가능합니다.
            </div>
        </div>
    )
}



const validationSchema = Yup.object({
  accountChecked: Yup.boolean().oneOf([true], '필수 항목입니다.'),
  ticketCount: Yup.number().min(1, '1매 이상 예매 가능합니다').required('필수 항목입니다.'),
  showDate: Yup.date().required('날짜를 선택해 주세요.'),
  depositor: Yup.string().required('입금자명을 입력해주세요.'),
});

export const TicketingForm = (props : Prop) => {
    const {id,onSubmit} = props;
    
    return (
        <Formik
          initialValues={{ accountChecked: false, ticketCount: 1, showDate: '', depositor: '' }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const req = {
                name: values?.depositor,
                reservationCount: values?.ticketCount,
                depositDate: values?.showDate
              };
              await onSubmit(req);
            } catch (error) {
              console.error("Error during submission:", error);
            } finally {
              setSubmitting(false);
            }
          }}>
             {({ errors, isValid, dirty }) => (
        <Form>
          <div className='w-full px-4'>
            <div className="flex flex-row w-full items-center justify-between mb-30px">
              <div className="flex flex-col justify-center text-left">
                <span className="text-pmd text-system-white">공연 예매는 선입금 후 가능합니다.</span>
                <span className="text-pmd text-system-white mb-10px">입금을 완료하셨습니까?</span>
                <Field name="accountChecked" component={CustomToggleSwitch} />
                <ErrorMessage name="accountChecked" component="div" className="text-red-500 text-psm" />
              </div>
            </div>
            <div className="flex flex-row w-full items-center justify-between mb-30px">
              <div className="flex flex-col items-start justify-center text-left">
                <span className="text-pmd text-system-white pb-14px">티켓 매수</span>
                <Field name="ticketCount" component={CustomCouterSwitch} />
              </div>
            </div>
            <CustomDateInputTicket label='입금한 날짜' name='showDate' type='date' initialval={null} />
            <CustomTextInputDark label='입금자명' name='depositor' type='text' placeholder='입금자명을 입력해주세요' initialval={null} />
          </div>
          <BottomButton disabled={!(isValid && dirty)} />
        </Form>
      )}
      </Formik>
    )
}