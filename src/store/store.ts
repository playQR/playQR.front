import Cookies from "js-cookie";
import {create, State, StateCreator } from "zustand";
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';
import {PromotionCreate, MusicInput,Billing} from "../promotion/types/common";
interface RUser {
    name : string;
    nickname : string;
    profileImage : string;
}

interface UserStore {
    user : RUser | null;
    setUser : (user : RUser | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user) => set({ user })
}));

interface AuthStore{
    accessToken: string | null;
    refreshToken: string | null;
    accessTokenExpireTime: Date | null;
    refreshTokenExpireTime: Date | null;
    isAuthenticated: boolean;
    setAuthenticated: (isAuthenticated: boolean) => void;
    setTokens: (accessToken: string|null, refreshToken: string|null, accessTokenExpireTime : Date | null, refreshTokenExpireTime : Date | null) => void;
    clearTokens: () => void;
    

}

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    refreshToken: null,
    accessTokenExpireTime: null,
    refreshTokenExpireTime: null,
    isAuthenticated: false,
    setTokens: (accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime) => set({ accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime }),
    clearTokens: () => set({ accessToken: null, refreshToken: null, accessTokenExpireTime: null, refreshTokenExpireTime: null}),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated })
}));

const useAuthStorePersist = create(persist<AuthStore>(
  (set) => ({
    accessToken: null,
    refreshToken: null,
    accessTokenExpireTime: null,
    refreshTokenExpireTime: null,
    isAuthenticated: false,
    setTokens: (accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime) => set({ accessToken, refreshToken, accessTokenExpireTime, refreshTokenExpireTime }),
    clearTokens: () => set({ accessToken: null, refreshToken: null, accessTokenExpireTime: null, refreshTokenExpireTime: null}),
    setAuthenticated: (isAuthenticated) => set({ isAuthenticated })}),
  {
    name: 'token-storage'

  }
));

interface ModalStore {
    isOpen : boolean;
    openModal : () => void;
    closeModal : () => void;
}

const useModalStore = create<ModalStore>((set) => ({
    isOpen: false,
    openModal: () => set({ isOpen: true }),
    closeModal: () => set({ isOpen: false }),
}));

interface TempCreatePromotion {
    temppromotion : PromotionCreate | null;
    step : number;
    modifiedTime : Date;
}

interface CreateTempPromotionStore {
    tempCreatePromotion : TempCreatePromotion;
    setTempCreatePromotion : (tempCreatePromotion : TempCreatePromotion) => void;
}
const useTempCreatePromotionStore = create<CreateTempPromotionStore>((set) => ({
    tempCreatePromotion: {
        temppromotion: null,
        step: 0,
        modifiedTime: new Date()
    },
    setTempCreatePromotion: (tempCreatePromotion) => set({ tempCreatePromotion })
}));


interface CreatePromotionStore {
  promotionData: PromotionCreate;
  updateData: (newData: Partial<PromotionCreate>) => void;
  getFullPromotionData: () => PromotionCreate;
  clearData : () => void;
}

const useCreatePromotionStore = create<CreatePromotionStore>((set, get) => ({
  promotionData: {
    step1:{
      team:'',
      title:'',
      imageList : [],
      showDate : '',
      time : {
        smeridian : '오전',
        shour: 12,
        sminute: 0,
        lmeridian : '오전',
        lhour: 12,
        lminute: 0,
      },
      showLocation : '',
    },
    step2:{
      content:'',
      musicList:[],
    },
    step3:{
      billing:{
        entranceFee:0,
        bankName: '',
        account: '',
        accountHolder: '',
        refundInfo: '',
      }
    }
  },
  updateData: (newData) => set(state => ({
    promotionData: { ...state.promotionData, ...newData }
  })),
  getFullPromotionData: () => get().promotionData,
  clearData : () => set({promotionData: {
    step1:{
      team:'',
      title:'',
      imageList : [],
      showDate : '',
      time : {
        smeridian : '오전',
        shour: 12,
        sminute: 0,
        lmeridian : '오전',
        lhour: 12,
        lminute: 0,
      },
      showLocation : '',
    },
    step2:{
      content:'',
      musicList:[],
    },
    step3:{
      billing:{
        entranceFee:0,
        bankName: '',
        account: '',
        accountHolder: '',
        refundInfo: '',
      }
    }
  }})
}));

interface prevUri{
    uri : string;
    params : any;
}
interface PrevUriStore {
    prevUri : prevUri;
    setPrevUri : (prevUri : prevUri) => void;
}

const useUriStore = create(persist<PrevUriStore>((set) => ({
    prevUri : {
        uri : '',
        params : {}
    },
    setPrevUri : (prevUri) => set({ prevUri })
  }),{
    name: 'uri-storage'
  }
))
const store = {
    useAuthStore,
    useAuthStorePersist,
    useModalStore,
    useUserStore,
    useCreatePromotionStore,
    useUriStore
};




export default store;