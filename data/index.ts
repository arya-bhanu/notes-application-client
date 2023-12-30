import { create } from 'zustand'
interface AuthHeader {
    isAuth: boolean
    setIsAuth: (bool: boolean) => void
}

export const useAuthHeader = create<AuthHeader>((set) => ({
    isAuth: false,
    setIsAuth: (val) => set(() => ({ isAuth: val }))
}))