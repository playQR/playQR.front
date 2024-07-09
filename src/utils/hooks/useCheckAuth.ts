import { useEffect, useState } from 'react';
import { axiosSemiSecureAPI } from '../../axios/index';
import { Member } from '../../promotion/types/common';


const useCheckAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [memberInfo, setMemberInfo] = useState<Member>({ id: -1, name: '', nickname: '', profileImg: '' });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    
    const authenticate = async () => {
      try {
        const response = await axiosSemiSecureAPI.get('/api/members');
        
        if (response.data.isSuccess === false) throw new Error('Not authenticated.');
          setIsAuthenticated(true);
          setMemberInfo(response.data.result);
      } catch (error) {
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