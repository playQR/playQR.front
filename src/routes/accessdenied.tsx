// AccessDeniedPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDeniedPage: React.FC = () => {
    const navigate = useNavigate();
        
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center'>
            <p className='text-ptitle font-bold text-system-white mb-5'>접근할 수 없는 페이지입니다.</p>
            <p className='text-pxl font-bold text-system-white mb-5'>이 페이지를 접근할 수 있는 권한이 없습니다.</p>
            <button className='bg-primary rounded-lg py-3 px-6 text-system-white'onClick={() => navigate('/')}>홈으로 돌아가기</button>
        </div>
    );
};

export default AccessDeniedPage;