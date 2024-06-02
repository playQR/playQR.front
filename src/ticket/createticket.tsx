import React,{useState, useRef, useEffect} from 'react'
import Nav from '../components/nav';
import Footer from '../components/footer';
import { useForm } from 'react-hook-form';
import QRCodeStyling from "qr-code-styling";
import { useNavigate } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';

type Props = {}
type FormType = {
    key: string,
}

const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
      color: "#4267b2",
      type: "square"
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 20
    }
  });

const CreateTicket :React.FC = (props: Props) => {
    const token = useCheckAuth();
    const navigate = useNavigate();

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current !== null) {
            qrCode.append(ref.current);  // 예시로 focus 메서드 사용, 실제로 div에서는 작동하지 않음
        }
      }, []);
    

    const [ticketObject, setTicketObject] = React.useState<FormType>({} as FormType)

    const { register, control, handleSubmit, getValues, formState: { errors } } = useForm<FormType>();
    
    const handleGetValues = () => {
        setTicketObject(getValues())
        if (getValues()!=null){
            qrCode.update({
                data: `${process.env.REACT_APP_HOST}/ticket/redirect?key=${getValues().key}`
              });
        }else{
            alert('값을 입력해주세요');
        }
    }

    const onDownloadClick = () => {
        qrCode.download({
          extension: "png"
        });
      };

    return (
        <div className='flex flex-col w-full h-screen'>
        <Nav/>
        <div className='flex flex-col w-full h-full p-10'>
                <div className='flex flex-row w-full justify-between'>
                    <h1 className='text-2xl'>티켓 생성하기</h1>   
                </div>


            
                <div className='border-b-2 border-gray-300 mt-3'></div>
                <div className='flex flex-col w-full mt-5'>
                    <div className='flex flex-row w-full justify-between'>
                        <div className='flex flex-col'>
                            <h2 className='text-xl'>KEY</h2>
                            <input type="text" className="border-2 border-gray-300 rounded p-2"
                                {...register('key')} />
                        </div>
                    </div>
                    
                    <div className='flex flex-row w-full justify-between mt-5'>
                        <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded text-white" onClick={handleGetValues}>QR 생성</button>
                    </div>
                </div>
                <div className='border-b-2 border-gray-300 mt-3'></div>
                <div className='flex items-center justify-center mt-10 mb-10'>
                    <div ref={ref} />
                </div>
                <button onClick={onDownloadClick} className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded text-white">QR 다운로드</button>
                <button onClick={()=>navigate('/ticket')}className="px-4 py-2 bg-slate-600 hover:bg-slate-700 rounded text-white mt-5">뒤로가기</button>
            </div>
            
        </div>)
}

export default CreateTicket