import axios from 'axios'
import store from '../store/store'
import { parseKSTDate } from '../utils/time';

const { useAuthStorePersist } = store;

export const BASE_URL = process.env.REACT_APP_API_URL
  
export const axiosSecureAPI = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosSemiSecureAPI = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosAPI = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosSecureAPI.interceptors.request.use(config => {
  
  const { accessToken } = useAuthStorePersist.getState();
  
  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axiosSecureAPI.interceptors.response.use(
  response => response, // 정상 응답이면 그대로 반환
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 400 && !originalRequest._retry) {
        const { refreshToken, refreshTokenExpireTime } = useAuthStorePersist.getState();
        
        // if (refreshTokenExpireTime !== null && currentTime > refreshTokenExpireTime.getTime()){
        //     useAuthStorePersist.getState().setTokens(null, null,null,null);
        //     window.location.href = '/'
        //     alert('토큰이 만료되었습니다. 다시 로그인해 주세요.')
        //     return Promise.reject(error);
        // }
        if(refreshToken === null || refreshTokenExpireTime === null){
          useAuthStorePersist.getState().setTokens(null, null,null,null);
          window.location.href = '/'
          alert('토큰이 없습니다. 다시 로그인해 주세요.')
        }
        originalRequest._retry = true;
        try {
            
            const tokenResponse = await axiosAPI.post('/api/tokens/reissue', null, {
              params : {
                refresh: refreshToken
              }
            } );
            const result = tokenResponse.data.result;
            const accessToken = result.accessToken;
            const newrefreshToken = result.refreshToken;
            const accessTokenExpireTime = parseKSTDate(result.code_expire);
            const refreshTokenExpireTime = parseKSTDate(result.refresh_expire);
            useAuthStorePersist.getState().setTokens(accessToken, newrefreshToken, accessTokenExpireTime, refreshTokenExpireTime);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosSecureAPI(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);


axiosSemiSecureAPI.interceptors.request.use(config => {
  
  const { accessToken } = useAuthStorePersist.getState();
  
  if (accessToken !== null) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axiosSemiSecureAPI.interceptors.response.use(
  response => response, // 정상 응답이면 그대로 반환
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 400 && !originalRequest._retry) {
        const { refreshToken, refreshTokenExpireTime } = useAuthStorePersist.getState();
        
        // if (refreshTokenExpireTime !== null && currentTime > refreshTokenExpireTime.getTime()){
        //     useAuthStorePersist.getState().setTokens(null, null,null,null);
        //     window.location.href = '/'
        //     alert('토큰이 만료되었습니다. 다시 로그인해 주세요.')
        //     return Promise.reject(error);
        // }
        if(refreshToken === null || refreshTokenExpireTime === null){
          useAuthStorePersist.getState().setTokens(null, null,null,null);
          
        }
        originalRequest._retry = true;
        try {
            
            const tokenResponse = await axiosAPI.post('/api/tokens/reissue', null, {
              params : {
                refresh: refreshToken
              }
            } );
            const result = tokenResponse.data.result;
            const accessToken = result.accessToken;
            const newrefreshToken = result.refreshToken;
            const accessTokenExpireTime = parseKSTDate(result.code_expire);
            const refreshTokenExpireTime = parseKSTDate(result.refresh_expire);
            useAuthStorePersist.getState().setTokens(accessToken, newrefreshToken, accessTokenExpireTime, refreshTokenExpireTime);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosSemiSecureAPI(originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);


