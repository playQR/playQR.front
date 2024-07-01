import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../store/store';
import { parseKSTDate } from '../utils/time';
const AuthHandler = () => {
    const {useAuthStorePersist} = store;
    const location = useLocation();
    const navigate = useNavigate();
    const setTokens = useAuthStorePersist(state => state.setTokens);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const accessToken = query.get('code');
    const refreshToken = query.get('refresh');
    const accessTokenExpireTime = parseKSTDate(query.get('code_expire'));
    const refreshTokenExpireTime = parseKSTDate(query.get('refresh_expire'));
    console.log(refreshToken)
    if (accessToken && refreshToken && accessTokenExpireTime && refreshTokenExpireTime) {
      setTokens(accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime);
      
      alert('로그인에 성공했습니다. 메인 페이지로 이동합니다.');
      navigate('/');
    } else {
      // 적절한 토큰이 없다면 로그인 페이지로 리다이렉트
      alert('로그인에 실패했습니다. 다시 시도해 주세요.');
      navigate('/');
    }
  }, [location, navigate, setTokens]);

  return (
    <div>로그인 중...</div>
  );
};

export default AuthHandler;
