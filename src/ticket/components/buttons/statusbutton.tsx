import React from 'react'

import { GuestStatus } from '../../types'

type Props = {
    status : GuestStatus,
    handleConfirmation : (guestId : number) => void
    guestId : number
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setGid : React.Dispatch<React.SetStateAction<number>>
}


const StatusButton = (props: Props) => {

    const {status, handleConfirmation, setGid, guestId, setIsOpen} = props

    const openModal = () => {
        setIsOpen(true)
        setGid(guestId)
    }

    switch (status) {
        case GuestStatus.AFTER_CONFIRMATION :
            return (
                <div className='w-full bg-gray-3 p-3 text-center rounded-xl  text-system-white text-plg mt-10px'>
                    입장 대기
                </div>
            )
        case GuestStatus.BEFORE_CONFIRMATION : 
            return (
                <div className='w-full flex flex-col text-center items-center justify-self-center mt-10px'>
                    <button onClick={()=> handleConfirmation(guestId)} className='w-full bg-primary p-3 text-center rounded-xl text-system-white text-plg mb-6px'>
                        예매 완료
                    </button>
                    <button onClick={()=> openModal()}  className='w-full border-system-error border-1px p-3 text-center text-system-error rounded-xl text-plg'>
                        예매 취소하기
                    </button>
                </div>
                
            )
        case GuestStatus.CHECKED_IN :
            return (
                <div className='w-full bg-gray-2 p-3 text-center rounded-xl text-system-white text-plg mt-10px'>
                    입장 완료
                </div>
            )
        default :
            return (
                <div></div>
            )
        }
}

export default StatusButton