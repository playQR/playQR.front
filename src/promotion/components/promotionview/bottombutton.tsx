import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useCallback} from 'react';
import store from '../../../store/store';

type Props = {
  id : number | undefined;
  isAuthenticated : boolean;
}

const backgroundStyle = {
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 53%, rgba(0, 0, 0, 0.7) 100%)',
};
  
  
const BottomButton = (props: Props) => {

  const {id} = props;
  const navigate = useNavigate();
  const { isAuthenticated } = props;
  

  const {useModalStore} = store;
  const { openModal } = useModalStore();

  const onClick = useCallback(() => {
    if(!isAuthenticated){
      openModal();
      return;
    }else{
      navigate(`/promotion/${id}/purchase`);
    }
  },[id]);

  return (
    <div style={backgroundStyle} className='fixed w-full md:w-640px bottom-0 h-100px'>
        <div className='flex h-full justify-end items-end px-4 pb-54px flex-end'>
            <button onClick={onClick} className='w-full bg-primary h-46px rounded-xl text-system-white text-plg'>예매하기</button>
        </div>
    </div>
  )
}

export default BottomButton