import React from 'react'
import SearchCard from '../main/components/search/searchcard'
import { Formik, Form,Field } from 'formik'
type Props = {}
// const Title = () => {
//     return(
//         <div className='mb-30px'>
//             <p className='text-plg text-system-white'>공연 예매하기</p>
//         </div>
// )
// }
// const InfoTable = () => {
//     return(
//         <table className='text-system-white text-pmd'>
//             <tr>
//                 <td>티켓 가격</td>
//                 <td>{ticket}</td>
//             </tr>
//             <tr>
//                 <td>입금 계좌</td>
//                 <td>{ticket}</td>
//             </tr>
//             <tr>
//                 <td>은행</td>
//                 <td>{ticket}</td>
//             </tr>
//             <tr>
//                 <td>예금주</td>
//                 <td>{ticket}</td>
//             </tr>
//         </table>)
// }

// const TicketingForm = () => {
//     return (
//         <Formik
//         initialValues={initialVal}
//         validationSchema={validationSchema}
//         onSubmit={
//           (values, {setSubmitting}) => {
//             console.log(values)
//             setTimeout(() => {
//               setSubmitting(false);
//             }, 400);
//           }
//         }>
//         <Form>
//           <div className="flex flex-row w-full items-center justify-between">
//             <div className="flex flex-col items-center justify-center text-left">
//                 <span className="text-pmd">공연 예매는 선입금 후 가능합니다.</span>
//                 <br/>
//                 <span className="text-pmd">입금을 완료하셨습니까?</span>
//                 <Field name={`musicList.${index}.open`} component={CustomToggleSwitch} />
//             </div>
//         </div>
//           <CustomTextInput label='공연장 위치를 알려주세요' name='showLocation' type='text' placeholder='정확한 위치를 입력해주세요' initialval = {initialVal.showLocation} />
//           <CheckIsFilled changeIsValid={changeIsValid} isValidTime={isValidTime}/>
//         </Form>
//       </Formik>
//     )
// }
// const Ticketing = (props: Props) => {
//   return (
//     <div className="flex flex-col min-h-screen justify-start bg-system-background pt-20px">
//         <div className='px-4'>
//             <Title/>
//             <SearchCard result={undefined}/>
//             <InfoTable/>
//             <TicketingForm/>
//         </div>
//     </div>
//   )
//}
const Ticketing = (props: Props) => {
  return (
    <div className="flex flex-col min-h-screen justify-start bg-system-background pt-20px">
        <div className='px-4'>
            공연 예약
        </div>
    </div>
  )
}

export default Ticketing