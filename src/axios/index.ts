import axios from 'axios'
import store from '../store/store'

const { useAuthStore } = store;

export const BASE_URL = process.env.REACT_APP_API_URL
  
export const axiosSecureAPI = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosAPI = axios.create({
     baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

axiosSecureAPI.interceptors.request.use(config => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
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
    if (error.response.status === 401 && !originalRequest._retry) {
        const { refreshToken } = useAuthStore.getState();
        if (refreshToken === null){
            useAuthStore.getState().setTokens(null, null);
            window.location.href = '/'
            alert('세션이 만료되었습니다. 다시 로그인해 주세요.')
            return Promise.reject(error);
        }
        originalRequest._retry = true;
        try {
            const tokenResponse = await axiosSecureAPI.post('/refresh', { refreshToken });
            const { accessToken } = tokenResponse.data;
            useAuthStore.getState().setTokens(accessToken, refreshToken);
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return (originalRequest);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
  }
);

export default axiosSecureAPI;