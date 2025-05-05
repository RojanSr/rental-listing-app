import type { HomeViewType } from '@/types/global'
import { create } from 'zustand'

type GlobalStoreType = {
  value: {
    homeViewType: HomeViewType
  }
  setter: {
    setHomeViewType: (type: GlobalStoreType['value']['homeViewType']) => void
    clearSharedState: () => void
  }
}

const initialState: Omit<GlobalStoreType, 'setter'> = {
  value: {
    homeViewType: 'rent',
  },
}

export const useGlobalStore = create<GlobalStoreType>((set) => ({
  ...initialState,
  setter: {
    setHomeViewType: (branch: HomeViewType) =>
      set((state) => ({
        value: {
          ...state.value,
          homeViewType: branch,
        },
      })),
    clearSharedState: () => {
      set(initialState)
    },
  },
}))
