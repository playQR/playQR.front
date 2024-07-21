export const shareKakao = (id : number) => {
  
  if (window.Kakao) {
    const kakao = window.Kakao;
    
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    }

    try{
      
      kakao.Share.sendCustom({
        templateId: Number(process.env.REACT_APP_KAKAO_TEMPLATE_ID),
        templateArgs : {
        "id" : id,
        },
        installTalk : true
    });
    }catch(e){
      //console.log(e)
    }
    
  }
};
