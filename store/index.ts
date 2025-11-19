import { IAuth } from '@/types/auth'
import { create } from 'zustand'

type IState = {
    auth: IAuth | null
}

export const useStore = create<IState>(() => ({
    auth: null,
}))
