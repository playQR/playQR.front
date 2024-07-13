import React,{ReactElement, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useCheckAuth from '../utils/hooks/useCheckAuth';
import { axiosSemiSecureAPI } from '../axios';
import Confirmation from '../ticket/components/confirmation/confirmation';
import ConfirmationError from '../ticket/components/confirmation/confirmationerror';
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
      if(response.data.isSucess && response.data.result){
        setIsConfirmed(true)
      }
    }catch(e){
      alert('입장 실패')
      //사유에 따라 리턴 나뉠거
      console.log(e)
    }
    setIsConfirming(false);
  }
  
  useEffect(()=>{
    if(isAuthenticated) confirmTicket();
  },[isAuthenticated])

  
  
  if(isLoading) return <div></div>
  else
  return isAuthenticated === true ? isConfirmed ? <Confirmation/> : <ConfirmationError/> : element;
};

export default ConfimationRoute;