import React, { useEffect } from 'react'
import Nav from '../components/nav';
import Footer from '../components/footer';
import  useCheckAuth from '../utils/hooks/useCheckAuth';
import InfoComponent from '../components/info/infocomponent';
import Search from '../components/search/search';
type Props = {}

const MainScreen = (props: Props) => {
    return (
        <div className='flex flex-col w-full h-screen bg-system-background p-4'>
            <Nav/>
            <InfoComponent/>
            <Search/>
        </div>
    )
}

export default MainScreen