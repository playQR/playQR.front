import React,{ReactElement, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
import { axiosSemiSecureAPI } from '../axios';
import Confirmation from '../ticket/components/confirmation/confirmation';
import ConfirmationError from '../ticket/components/confirmation/confirmationerror';
import Loading from '../common/loading';
interface ConfirmationRouteProps {
  element: ReactElement;
}

const ConfimationRoute = ({ element }: ConfirmationRouteProps ) => {
  const { isAuthenticated,isLoading } = useCheckAuth();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false)
  const {uuid} = useParams();

  const confirmTicket = async () => {
    setIsConfirming(true);
    try{
      const response = await axiosSemiSecureAPI.post(`/api/guests/entrance?uuid=${uuid}`)
      if(response.data.isSuccess && response.data.result){
        setIsConfirmed(true)
      }
    }catch(e){
      //console.log(e)
    }
    setIsConfirming(false);
  }
  
  useEffect(()=>{
    if(isAuthenticated) confirmTicket();
  },[isAuthenticated])

  
  
  if(isLoading) return <div></div>
  else
  return isAuthenticated === true ? isConfirming ? <Loading text="유효성 확인 중.." isLoading={isConfirming}/> : isConfirmed ? <Confirmation/> : <ConfirmationError/> : element;
};

export default ConfimationRoute;
