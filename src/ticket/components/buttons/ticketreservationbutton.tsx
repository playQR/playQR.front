import React from 'react'
import { GuestCardType, GuestStatus } from '../../types'
import { useNavigate } from 'react-router-dom'

type Props = {
    pid : number
    result : GuestCardType

}

const TicketReservationButton = (props: Props) => {
    const {pid, result} = props;
    const navigate = useNavigate();

    const checkReservation = () => {
        navigate(`${pid}/reservation/${result.guestId}`);
    }
    return (
        
            result.reservationStatus === GuestStatus.BEFORE_CONFIRMATION? 
            <div className='flex flex-col mb-10px justify-center items-center'>
                <button className='w-full bg-secondary p-3 text-center rounded-xl  text-system-white text-plg mt-10px'>
                        내 티켓 확인하기
                </button>
                <div className='text-psm text-system-white font-normal mt-1'>
                    공연 주최자가 입금을 확인하고 있어요!
                </div>
            </div>
             : <button onClick={checkReservation} 
                className='w-full bg-primary p-3 text-center rounded-xl  text-system-white text-plg mt-10px'>
                        내 예매 확인하기
                </button>

    )
}

export default TicketReservationButton