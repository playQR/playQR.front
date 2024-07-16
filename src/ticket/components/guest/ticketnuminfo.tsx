import React, { useEffect } from 'react'
import { axiosSemiSecureAPI } from '../../../axios';
import { useParams } from 'react-router-dom';

type Props = {}
type TicketNum = {
    currentCount : number;
    maxAudience : number;
}

const TicketNumInfo = (props: Props) => {
    const {id} = useParams();
    const [ticketnum, setTicketNum] = React.useState<TicketNum>({currentCount: 0, maxAudience: 0})
    const fetchData = async () => {
        try{
            const response = await axiosSemiSecureAPI.get(`/api/guests/${id}/reservation/count`)
            if(response.data.isSuccess === true){
                const result = response.data.result as TicketNum
                const {currentCount,maxAudience} = result
                setTicketNum({currentCount,maxAudience})
            }
        }catch(e){
            //console.log(e)
        }
    }
    useEffect(()=>{
        fetchData();
    },[])
  return (
    <div className='w-full text-left flex flex-row mt-10px'>
        <div className='text-pmd text-primary font-semibold'>
            <div>
                {`팔린 티켓 ${ticketnum.currentCount}장`}
            </div>
        </div>
        <div>&nbsp;</div>
        <div className='text-pmd text-gray-2 font-semibold'>
            <div>
                {`남은 티켓 ${ticketnum.maxAudience}장`}
            </div>
        </div>
    </div>
  )
}

export default TicketNumInfo