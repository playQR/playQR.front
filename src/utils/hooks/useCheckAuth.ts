import { useEffect, useState } from 'react';
import { axiosSemiSecureAPI } from '../../axios/index';
import { Member } from '../../promotion/types/common';
import { handleApiError } from '../error';
import axios from 'axios';


const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<Member>({ id: -1, name: '', nickname: '', profileImg: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    
    const authenticate = async () => {
      try {
        const {data} = await axiosSemiSecureAPI.get('/api/members');
        if (data.isSuccess){
          setIsAuthenticated(true);
          setMemberInfo(data.result);
        }
          
      } catch (error) {
          if(axios.isAxiosError(error)){
            handleApiError(error)
          }
          handleApiError(error);
          setIsAuthenticated(false);
          setMemberInfo({ id: -1, name: '', nickname: '', profileImg: ''});
      } finally {
          setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  return { isAuthenticated, memberInfo, isLoading };
};

export default useCheckAuth;