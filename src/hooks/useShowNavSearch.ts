import { SHOW_NAV_SEARCH_FOR_PATH } from '@/constants'

export const useShowNavSearch = (pathname: string) => {
  return {
    showNavSearch: SHOW_NAV_SEARCH_FOR_PATH.includes(pathname.split('/')[1]),
  }
}
