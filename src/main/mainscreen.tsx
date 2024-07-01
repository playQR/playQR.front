import { useEffect } from 'react'
import Nav from '../common/components/nav/nav';
import InfoComponent from './components/info/infocomponent';
import Search from './components/search/search';
import KakaoModal from '../login/Modal';
import store from '../store/store';
import {axiosAPI, axiosSecureAPI} from '../axios/index';
type Props = {}

const MainScreen = (props: Props) => {

    return (
        <div className="flex flex-col justify-center w-full h-full bg-system-background">
            <div className='flex flex-col min-h-screen justify-start bg-system-background p-4'>
                <KakaoModal/>
                <Nav/>
                <InfoComponent/>
                <Search/>
            </div>
        </div>
    )
}

export default MainScreen