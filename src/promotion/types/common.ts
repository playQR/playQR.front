import { SetListMusic } from "./list";

export interface Music {
  id: number;
  title: string;
  artist: string;
  musicLikeInfo: {
    count: number;
    liked: boolean;
  };
  isOpen: boolean;
}

export interface MusicInput {
  id: number | null;
  title: string;
  artist: string;
  isOpen: boolean;
}
export interface Billing {
  entranceFee: number;
  bankName: string;
  account: string;
  accountHolder: string;
  refundInfo: string;
}

export interface Member {
  id: number;
  name: string;
  nickname: string;
  profileImg: string | undefined;
}

export interface ViewMemember {
  name: string;
  nickname: string;
  profileImg: string | undefined;
}

export interface Ticket {
  ticketId: number;
  uuid: string;
  dueDate: string;
}

export interface Promotion {
  promotionId: number;
  title: string;
  content: string;
  team: string;
  price: number; //
  musicList: Music[];
  imageList: string[] | undefined;
  location: string;
  date: string;
  startTime: string;
  billing: Billing;
}

export interface PromotionCard {
  promotionId: number;
  title: string;
  team: string;
  thumbnail: string;
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  entranceFee: number;
  writer: ViewMemember;
  like: boolean;
  likecount: number;
}

export interface PromotionCardV2 {
  promotionId: number;
  title: string;
  team: string;
  thumbnail: string;
  date: string;
  location: string;
  startTime: string;
  endTime: string;
  entranceFee: number;
  writer: Member;
  boardLikeInfo: LikeInfo;
}

export interface LikeInfo {
  count: number;
  liked: boolean;
}

export interface ViewPromotion {
  promotionId: number;
  title: string;
  content: string;
  team: string;
  entranceFee: number;
  maxAudience: number;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  bankName: string;
  account: string;
  accountHolder: string;
  refundInfo: string;
  writer: Member;
  boardLikeInfo: LikeInfo;
  musicList: Music[];
  imageList: string[];
}

export interface PromotionCreate {
  step1: {
    team?: string;
    title?: string;
    imageList?: File[] | string[];
    showDate?: string;
    time?: {
      smeridian?: string;
      shour?: number;
      sminute?: number;
      lmeridian?: string;
      lhour?: number;
      lminute?: number;
    };
    showLocation?: string;
    maxAudience?: number;
  };
  step2: {
    content?: string;
    musicList?: MusicInput[];
  };
  step3: {
    billing: Billing;
  };
}
