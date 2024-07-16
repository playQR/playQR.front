export const shareKakao = (id : number) => {
  
  if (window.Kakao) {
    const kakao = window.Kakao;
    
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    }

    // kakao.Link.sendDefault({
    //   objectType: "feed",
    //   content: {
    //     title : template.title,
    //     description : template.description,
    //     imageUrl : template.imageUrl,
    //     link: {
    //       mobileWebUrl: template.mobileWebUrl, 
    //       webUrl: template.webUrl
    //     }
    //   },
    //   buttons: [
    //     {
    //       title: template.buttonTitle,
    //       link: {
    //         mobileWebUrl: template.mobileWebUrl,
    //         webUrl: template.webUrl
    //       }
    //     }
    //   ]
    // });
    try{
      
      kakao.Share.sendScrap({
      templateId: 109927,
      requestUrl: "https://band-it-dev.vercel.app/",
      templateArgs : {
        "id" : id,
      }
    });
    }catch(e){
      console.log(e)
    }
    
  }
};