import { useEffect } from 'react'
import Nav from '../common/components/nav/nav';
import InfoComponent from './components/info/infocomponent';
import Search from './components/search/search';
import KakaoModal from '../login/Modal';
import store from '../store/store';
import {axiosAPI, axiosSecureAPI} from '../axios/index';
type Props = {}

const MainScreen = (props: Props) => {
    useEffect (() => {
        async () => {
            try{
                //user 를 전역 store에 정보를 추가할 것임.
                const user = await axiosSecureAPI.get('/user');
                console.log(user);
            }catch(error){
                // 유저가 없다는 에러, 아니면 토큰이 만료되었다는 에러를 분류해서 처리해야함.
                console.log(error);
            }
        }
    }, []);

    return (
        <div className="flex flex-col justify-center w-full h-full bg-system-background">
            <div className='flex flex-col min-h-screen justify-center bg-system-background p-4'>
                <KakaoModal/>
                <Nav/>
                <InfoComponent/>
                <Search/>
            </div>
        </div>
    )
}

export default MainScreen