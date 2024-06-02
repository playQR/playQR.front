import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  useAuthStore  from '../../store/store'; // 경로는 실제 상황에 맞게 조정하세요.

function useCheckAuth() {
    const { token } = useAuthStore(state => state);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === undefined) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [token, navigate]);

    return token;  // 필요에 따라 토큰을 반환할 수 있습니다.
}

export default useCheckAuth;