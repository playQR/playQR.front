import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import store from '../../../store/store';
import { axiosSemiSecureAPI } from '../../../axios';

type Props = {
  id: number | undefined;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
}

const backgroundStyle = {
  background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 53%, rgba(0, 0, 0, 0.7) 100%)',
};

const BottomButton = (props: Props) => {
  const { id, isAuthenticated, isAuthLoading } = props;
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(false);

  const { useModalStore } = store;
  const { openModal } = useModalStore();

  const fetchData = useCallback(async () => {
    if (isAuthLoading) return;
    if (isAuthenticated) {
      try {
        const res = await axiosSemiSecureAPI.get(`/api/guests/${id}/reservation/check`);
        if (res.data.isSuccess) {
          setDisabled(res.data.result);
        }else{
          setDisabled(true);
        }
      } catch (e) {
        //console.log(e);
      }
    }else{
      setDisabled(false);
    }
  }, [id, isAuthenticated, isAuthLoading, disabled]);

  const onClick = useCallback(async () => {
    if (!isAuthLoading) {
      if (!isAuthenticated) {
        openModal();
      } else {
        navigate(`/promotion/${id}/purchase`);
      }
    }
  }, [id, isAuthLoading, isAuthenticated, navigate, openModal]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  useEffect(()=>{
    setDisabled(true)
  },[])

  return (
    <div style={backgroundStyle} className='fixed w-full md:w-768px bottom-0 h-100px'>
      <div className='flex h-full justify-end items-end px-4 pb-54px flex-end'>
        <button 
        onClick={onClick} 
        className={`w-full  ${disabled ? 'bg-text-disabled' : 'bg-primary'} h-46px rounded-xl text-system-white text-plg`} disabled={disabled}>
          {disabled ? '이미 예약한 공연입니다' : '예매하기'}
        </button>
      </div>
    </div>
  );
}

export default BottomButton;