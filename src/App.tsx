import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
function App() {
  const [containerStyle, setContainerStyle] = useState({
    width: `100%`,
  });
  useEffect(() => {
    if (window.Kakao) {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
      }
    } else {
      //alert('페이지를 새로고침해주세요!');
    }
  }, []);

  return (
    <div style={containerStyle}>
      <Outlet />
      <SpeedInsights />
      <Analytics />
    </div>
  );
}
export default App;
