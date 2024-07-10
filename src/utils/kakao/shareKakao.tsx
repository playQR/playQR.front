import { KakaoTemplate } from "../../common/types";

export const shareKakao = async (template : KakaoTemplate) => {
  if (window.Kakao) {
    const kakao = window.Kakao;
    
    if (!kakao.isInitialized()) {
      kakao.init(process.env.REACT_APP_KAKAO_SDK_KEY);
    

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
      requestUrl: 'https://www.naver.com',
      templateId: 109927,
    });
    }catch(err){
      console.log(err)
    }
    
  }
}};