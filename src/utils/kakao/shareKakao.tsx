export const shareKakao = (id : number) => {
  
  if (window.Kakao) {
    const kakao = window.Kakao;
    
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    }

    try{
      
      kakao.Share.sendScrap({
        templateId: process.env.REACT_APP_KAKAO_TEMPLATE_ID,
        requestUrl: process.env.REACT_APP_KAKAO_SHARE_DOMAIN,
        templateArgs : {
        "id" : id,
      }
    });
    }catch(e){
      //console.log(e)
    }
    
  }
};
