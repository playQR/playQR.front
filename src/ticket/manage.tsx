import React from 'react'
import Nav from '../common/components/nav/nav'
import Guest from './components/guest/guest'
import BackButton from './components/guest/backbutton'
import TicketNumInfo from './components/guest/ticketnuminfo'
import QrCard from './components/qr/qrcard'


type Props = {
}

const Title = () => {
    return (
        <div className='text-ptitle text-system-white font-bold text-left w-full mb-30px'>
            예매자 관리하기
        </div>
    )
}

const Manage = (props: Props) => {
    
    
    return (
        <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
            <Nav/>
            <BackButton/>
            <Title/>
            <QrCard/>
            <TicketNumInfo/>
            <Guest/>
        </div>
    )
}

export default Manage