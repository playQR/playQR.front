import React from 'react'
import Nav from '../common/components/nav/nav'
import { useParams } from 'react-router-dom'
import { axiosSemiSecureAPI } from '../axios'
import Guest from './components/guest/guest'
import BackButton from './components/guest/backbutton'
import TicketNumInfo from './components/guest/ticketnuminfo'


type Props = {
}

const Title = () => {
    return (
        <div className='text-ptitle text-system-white font-semi-bold text-left w-full'>
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
            <TicketNumInfo/>
            <Guest/>
        </div>
    )
}

export default Manage