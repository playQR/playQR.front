import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../store/store';
import { parseKSTDate } from '../utils/time';
const AuthHandler = () => {
    const {useAuthStorePersist, useUriStore} = store;
    const location = useLocation();
    const navigate = useNavigate();
    const setTokens = useAuthStorePersist(state => state.setTokens);
    const {prevUri, setPrevUri} = useUriStore();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('code');
    const refreshToken = query.get('refresh');
    const accessTokenExpireTime = parseKSTDate(query.get('code_expire'));
    const refreshTokenExpireTime = parseKSTDate(query.get('refresh_expire'));
    if (accessToken && refreshToken && accessTokenExpireTime && refreshTokenExpireTime) {
      setTokens(accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime);
      if(prevUri.uri===''){
        navigate('/');
      }else{
        setPrevUri({uri: '',params: {}})
        navigate(prevUri.uri, { replace: true })
      }
      
    } else {
      // 적절한 토큰이 없다면 로그인 페이지로 리다이렉트
      setPrevUri({uri: '',params: {}})
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      navigate('/');
    }
  }, [location, navigate, setTokens]);

  return (
    <div>로그인 중...</div>
  );
};

export default AuthHandler;
