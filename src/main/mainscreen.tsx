import React, { useEffect } from 'react'
import Nav from '../components/nav';
import Footer from '../components/footer';
import  useCheckAuth from '../utils/hooks/useCheckAuth';
type Props = {}

const MainScreen = (props: Props) => {
    return (
        <div className='flex flex-col w-full h-screen bg-system-background p-4'>
            <Nav/>
            <div className='flex flex-col w-full h-full items-center justify-center'>
                <h1 className='text-2xl'>Main Screen</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default MainScreen