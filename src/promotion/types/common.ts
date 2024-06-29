import { SetListMusic,Comment } from "./list";

export interface Music {
  id: number;
  title: string;
  artist: string;
  open: boolean;
}

export interface MusicInput{
  title: string;
  artist: string;
  open: boolean;
}
export interface Billing {
  price: number;
  bankName: string;
  bankAccount: string;
  bankAccountHolder: string;
  refundPolicy: string;
}

export interface Member {
  name: string;
  nickname: string;
  profileImg: string | undefined;
}

export interface Promotion {
  promotionId: number;
  title: string;
  content: string;
  team: string;
  price: number;//
  musicList: Music[];
  imageList: string[] | undefined;
  location: string;
  date: string;
  startTime: string;
  billing : Billing;
 
}

export interface ViewPromotion {
  promotionId: number;
  title: string;
  content: string;
  team: string;
  musicList: SetListMusic[];
  imageList: string[] | undefined;
  location: string;
  date: string;
  startTime: string;
  
  billing : Billing;
  comment : Comment[];
}

export interface PromotionCreate {
  step1 : {
    team?: string;
    title?: string;
    imageList?: File[];
    date?: string;
    time? : {
    smeridian? : string;
    shour?: number;
    sminute?: number;
    lmeridian? : string;
    lhour?: number;
    lminute?: number;
    location?: string;
  }
  };
step2:{
  content?: string;
  musicList?: MusicInput[];
}
step3:{
  billing: Billing;

};
}