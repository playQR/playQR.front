import Cookies from "js-cookie";
import {create} from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
interface RUser {
    name : string;
    nickname : string;
    profileImage : string;
}

interface AuthStore {
    token: string | undefined;
    user: RUser | undefined;
    setToken: (token: string) => void;
    unsetToken: () => void;
    setUser: (user: RUser) => void;
    unsetUser: (cb?: () => void) => void;
}

const useAuthStore = create<AuthStore>((set) => ({

    token: localStorage.getItem("access-token") || undefined,
    // initialize: () => {
    //     // const savedToken = localStorage.getItem("token");
    //     // const cookieToken = Cookies.get('access-token');

    //     // if (!savedToken && !!cookieToken) {
    //     // localStorage.setItem("token", cookieToken);
    //     // }

    //     // getMyInfo().then((response) => {
    //     //     if (!response.isOk) {
    //     //         return;
    //     //     }

    //     //     set((x:any) => ({ ...x, user: response.user }));
    //     // });

    // },
    user : undefined,
    
    setToken : (token:string) => {
        localStorage.setItem("access-token", token);
        set((x:any) => ({ ...x, token }))
    },
    unsetToken: () => {
        localStorage.removeItem("access-token");
        set((x:any) => ({ ...x, token: undefined }));
    },
    setUser: (user: RUser) => {
        set((x:any) => ({ ...x, user }));
    },
    unsetUser: (cb?: () => void) => {
        set((x:any) => ({ ...x, user: undefined }));
        cb?.();
    },
    
}));


export default useAuthStore;