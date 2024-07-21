import {useEffect, useState} from 'react'
import {axiosSemiSecureAPI} from '../../../axios/index';
import store from '../../../store/store';
import axios from 'axios';
import { handleApiError } from '../../../utils/error';

type Props = {}

const Title = () => {
    return (
        <div className='font-bold'>
            <div className ='text-system-white text-ptitle'>
                    그리고, 우리 둘
                </div>
            <div className = 'flex flex-row'>
                <div className ='text-primary text-ptitle text-700'>아무 말 없이&nbsp;</div>
                <div> </div>
                <div className ='text-system-white text-ptitle'> 나란히</div>
            </div>
        </div>
    )
}

const InfoComponent = (props: Props) => {
    const { useAuthStorePersist, useUserStore, useModalStore } = store;
    const [user, setUser] = useState(useUserStore.getState().user);
    const { accessToken, accessTokenExpireTime } = useAuthStorePersist(state => ({
        accessToken: state.accessToken,
        accessTokenExpireTime: state.accessTokenExpireTime
    }));
    
    async function fetchUserData() {
        if (accessToken!==null && accessTokenExpireTime!==null) {
            try {
               
                const res = await axiosSemiSecureAPI.get('/api/members');
                useUserStore.getState().setUser(res.data.result);
                setUser(res.data.result);
                
            } catch (e) {
                if(axios.isAxiosError(e)){
                    handleApiError(e);
                }
                useUserStore.getState().setUser(null);
            }
        }
    }
    useEffect(()=>{
        fetchUserData();
    },[])

    const { openModal } = useModalStore(state => state);
    return (
        user === null ? 
            <div className='flex flex-col w-full items-start'>
                <button onClick={openModal}>
                    <div className='text-system-white mb-10px text-psm underline'>
                        로그인을 해주세요
                    </div>
                </button>
                <Title/>
            </div> : 
            <div className='flex flex-col w-full'>
                <div className='text-system-white mb-10px text-psm'>
                    {`${user.name}님, 안녕하세요`}
                </div>
                <Title/>
            
        </div>
  )
}

export default InfoComponent
