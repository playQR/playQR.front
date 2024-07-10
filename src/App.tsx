import { Outlet } from 'react-router-dom';
import { useEffect,useState } from 'react';
function App() {
  const width = 640;
    const [containerStyle, setContainerStyle] = useState({
    width: `${width}px`,
    margin: '0 auto',
  });
  useEffect(() => {

    window.Kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    window.Kakao.isInitialized();
    const updateStyle = () => {
      if (window.innerWidth >= width){
        setContainerStyle({
          width: `${width}px`,
          margin: '0 auto',
        });
      } else {
        setContainerStyle({
          width: '100%',
          margin: '0 auto',
        });
      }
    };

    // 처음 로드될 때 스타일 설정
    updateStyle();
 // 윈도우 크기 변경 시 스타일 업데이트
    window.addEventListener('resize', updateStyle);
    // 기존 배경 색상을 저장합니다.
    const originalBackgroundColor = document.body.style.backgroundColor;

    // 새로운 배경 색상을 설정합니다.
    document.body.style.backgroundColor = '#222222';

    // 컴포넌트가 언마운트될 때 원래 배경 색상으로 복원합니다.
    return () => {
      document.body.style.backgroundColor = originalBackgroundColor;
      window.removeEventListener('resize', updateStyle);
    };
  }, []);

  return (
    <div style={containerStyle}>
      <Outlet/>
    </div>
      
  );
}
export default App;
