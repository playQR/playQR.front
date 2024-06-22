import { useEffect } from 'react'
import Nav from '../components/nav';
import InfoComponent from '../components/info/infocomponent';
import Search from '../components/search/search';
import KakaoModal from '../login/Modal';
import {axiosAPI} from '../axios/index';
import Container from '../container/container';
type Props = {}

const MainScreen = (props: Props) => {
    useEffect (() => {
        axiosAPI.get('/promotions').then((res) => {
            alert('API Server Connected')
            console.log(res);
        }).catch((err) => {
            console.log(err);})
    }, []);

    return (
        <div className="flex justify-center w-screen h-full bg-system-background">
            <div className='flex flex-col min-h-screen max-w-lg justify-center bg-system-background p-4'>
                <KakaoModal/>
                <Nav/>
                <InfoComponent/>
                <Search/>
            </div>
        </div>
    )
}

export default MainScreen