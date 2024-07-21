import axios from 'axios'
import store from '../store/store'
import { parseKSTDate } from '../utils/time';
import { handleApiError } from '../utils/error';

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
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  else{
    return Promise.reject(new Error('No Token'));
  }
  return config;
}, error => {
  handleApiError(error);
  return Promise.reject(error);
});

axiosSemiSecureAPI.interceptors.request.use(config => {
  
  const { accessToken } = useAuthStorePersist.getState();
  
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    
  }

  return config;
}, error => {
  handleApiError(error);
  return Promise.reject(error);
});

// 응답 인터셉터 추가
axiosSemiSecureAPI.interceptors.response.use(
  response => response, // 정상 응답이면 그대로 반환
  async error => {
    const originalRequest = error.config;
    
    if (error.response.status === 400 && !originalRequest._retry) {
        
        const { refreshToken, refreshTokenExpireTime } = useAuthStorePersist.getState();
        if(refreshToken === null || refreshTokenExpireTime === null){
          useAuthStorePersist.getState().setTokens(null, null,null,null);
          return new Error('No Token');
        }
        else{
          
          try {
            console.log('refreshToken is not null')
            originalRequest._retry = true;
            const tokenResponse = await axiosAPI.post('/api/tokens/reissue', null, {
              params : {
                refresh: refreshToken
              }
            });
            const result = tokenResponse.data.result;
            const accessToken = result.accessToken;
            const newrefreshToken = result.refreshToken;
            const accessTokenExpireTime = parseKSTDate(result.code_expire);
            const refreshTokenExpireTime = parseKSTDate(result.refresh_expire);
            useAuthStorePersist.getState().setTokens(accessToken, newrefreshToken, accessTokenExpireTime, refreshTokenExpireTime);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosSemiSecureAPI(originalRequest);
          } catch (refreshError) {
              handleApiError(refreshError);
              return Promise.reject(refreshError);
          }
        }
    }else{
      handleApiError(error);
      return Promise.reject(error);
    }
  }
);
axiosSecureAPI.interceptors.response.use(
  response => response, // 정상 응답이면 그대로 반환
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 400 && !originalRequest._retry) {
        const { refreshToken, refreshTokenExpireTime } = useAuthStorePersist.getState();
       
        if(refreshToken === null || refreshTokenExpireTime === null){
          
          useAuthStorePersist.getState().setTokens(null, null,null,null);
          handleApiError(error)
          return Promise.reject(error);
        }
        else{
          console.log('refreshtoken not null')
          try {
            originalRequest._retry = true;
            const tokenResponse = await axiosAPI.post('/api/tokens/reissue', null, {
              params : {
                refresh: refreshToken
              }
            });
            const result = tokenResponse.data.result;
            const accessToken = result.accessToken;
            const newrefreshToken = result.refreshToken;
            const accessTokenExpireTime = parseKSTDate(result.code_expire);
            const refreshTokenExpireTime = parseKSTDate(result.refresh_expire);
            useAuthStorePersist.getState().setTokens(accessToken, newrefreshToken, accessTokenExpireTime, refreshTokenExpireTime);
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axiosSemiSecureAPI(originalRequest);
          } catch (refreshError) {
              handleApiError(refreshError);
              return Promise.reject(refreshError);
          }
        }
        
    }
    console.log('error')
    handleApiError(error);
    return Promise.reject();
  }
);