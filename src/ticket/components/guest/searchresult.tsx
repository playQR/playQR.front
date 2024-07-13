import React from 'react'
import { GuestCardType } from '../../types'
import GuestCard from './guestcard'
import StatusButton from '../buttons/statusbutton'
import DeleteModal from '../modals/deletemodal'
import DeleteTicketModal from '../modals/deleteticketmodal'
import { set } from 'react-hook-form';

type Props = {
    results : GuestCardType[]
    handleConfirmation : (guestId : number) => void
    handleCancel : () => void
    isOpen : boolean
    setIsOpen : React.Dispatch<React.SetStateAction<boolean>>
    setGid : React.Dispatch<React.SetStateAction<number>>
}

const GuestResult : React.FC<Props> = (props: Props) => {
  
  const result : GuestCardType[] = props.results

  const {isOpen, setIsOpen} = props

  
  return (
    <div className='flex flex-col w-full space-y-5 items-center justify-center'>
      {
        result.length !== 0?
          result.map((r) => {
            
            return (
              <div className='w-full'>
                <GuestCard result={r}/>
                <StatusButton 
                status={r.reservationStatus}
                handleConfirmation={props.handleConfirmation} 
                guestId={r.guestId}
                setIsOpen={setIsOpen}
                setGid = {props.setGid}
                />
              </div>
              )
          }) : 
        <div className='flex w-full items-center justify-center'>
          <p className='text-gray-3'>예매자가 없습니다.</p>
        </div>
      }
      <DeleteTicketModal isOpen={isOpen} setIsOpen={setIsOpen} deleteGuest={props.handleCancel}/>
    </div>
  )
}

export default GuestResult