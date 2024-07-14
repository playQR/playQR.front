import { useEffect, useState } from 'react';
import Nav from '../common/components/nav/nav';
import KakaoModal from '../login/Modal';
import PromotionInfo from './components/promotionview/promotioninfo';
import BottomButton from './components/promotionview/bottombutton';
import {useParams} from 'react-router-dom';
import { ViewPromotion, } from './types';
import { axiosAPI } from '../axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../common/loading';
import useCheckAuth from '../utils/hooks/useCheckAuth';
import CustomToast from '../common/components/toast/customtoast';
type Props = {}

const PromotionView = (props: Props) => {

    
    const { id } = useParams()
    const navigate = useNavigate();
    const [result, setResult] = useState<ViewPromotion | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLikeLoading, setIsLikeLoading] = useState<boolean>(false);
    const {isAuthenticated, memberInfo,isLoading : isAuthLoading } = useCheckAuth();
  
    const fetchData = async () => {
      try{
        const response = await axiosAPI.get(`/api/promotions/${id}`)
        if(response.data.isSuccess === true){
          const result = response.data.result
          setResult({...result, musicLikeList: []}) 
          };
        }
      catch(e:any){
        alert('정보를 불러오는데 실패했습니다. 다시 시도해주세요.')
        navigate('/')
      }
    }
    

    useEffect(()=>{
      setIsLoading(true);
      fetchData();
      setIsLoading(false);
    },[])

    return (
        <div className='w-full relative'>
          
            <div className='flex flex-col min-h-screen w-full bg-system-background p-4'>
                <KakaoModal/>
                <CustomToast/>
                <Nav/>
                {result === null || isAuthLoading ? <Loading isLoading={result===null} text={"정보를 가져오는 중입니다."}/> : <PromotionInfo id={Number(id)} isAuthenticated={isAuthenticated} result={result} isLoading={isLoading} memberInfo={memberInfo}/>}
            </div>
            <BottomButton isAuthenticated={isAuthenticated} id={Number(id)} isAuthLoading={isAuthLoading}/>
        </div>
    )
}

export default PromotionView