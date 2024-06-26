import Cookies from "js-cookie";
import {create} from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';
import Modal from 'react-modal';
interface RUser {
    name : string;
    nickname : string;
    profileImage : string;
}

interface AuthStore {
    accessToken: string | null;
    refreshToken: string | null;
    setTokens: (accessToken: string | null, refreshToken: string | null) => void;
    clearTokens: () => void;

}

const useAuthStore = create<AuthStore>((set) => ({
    accessToken: null,
    refreshToken: null,
    setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
    clearTokens: () => set({ accessToken: null, refreshToken: null })

    
}));

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

const store = {
    useAuthStore,
    useModalStore,
};


export default store;