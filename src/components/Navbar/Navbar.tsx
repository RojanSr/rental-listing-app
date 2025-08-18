import { AppLogo } from '../Logo'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOutIcon, Menu as MenuIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import AuthDialog from '../auth/AuthDialog'
import { Link, useLocation } from '@tanstack/react-router'
import LandingSearch from '@/features/listing/search/LandingSearch'
import { useState } from 'react'
import type { AuthDialogState } from '../auth/auth'
import { useAuth } from '@/hooks/useAuth'
import { useShowNavSearch } from '@/hooks'

export type SearchState = {
  value: string
  lat: number | undefined
  lon: number | undefined
}

const INITIAL_SEARCH_STATE = {
  value: '',
  lat: undefined,
  lon: undefined,
}

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()
  const { showNavSearch } = useShowNavSearch(pathname)
  const [authDialogOpen, toggleAuthDialog] = useState<AuthDialogState>({
    authType: 'login',
    open: false,
  })
  const [search, setSearch] = useState<SearchState>(INITIAL_SEARCH_STATE)
  return (
    <nav className=" py-2 sticky top-0 z-50 bg-white">
      <div className="flex items-center gap-4 justify-between relative text-lg app-container">
        <Link to="/" onClick={() => setSearch(INITIAL_SEARCH_STATE)}>
          <AppLogo />
        </Link>
        {showNavSearch && (
          <div className="absolute right-1/2 translate-x-[50%]">
            <LandingSearch setSearch={setSearch} search={search} />
          </div>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="border-2 border-zinc-300 hover:shadow-[0px_10px_19px_rgba(0,0,0,0.1)] transition-all py-2 px-4 rounded-full flex items-center gap-4 cursor-pointer">
              <MenuIcon width={'1.2rem'} />
              {isAuthenticated && (
                <Avatar className="w-[35px] h-[35px]">
                  <AvatarImage src={NoAvatarSVG} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
            className="px-0 min-w-[240px] "
          >
            {!isAuthenticated && (
              <>
                <DropdownMenuItem
                  className="font-semibold px-3 py-4 text-sm rounded-none"
                  onClick={() =>
                    toggleAuthDialog({ authType: 'signup', open: true })
                  }
                >
                  Sign Up
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-3 py-4 text-sm rounded-none"
                  onClick={() =>
                    toggleAuthDialog({ authType: 'login', open: true })
                  }
                >
                  Login In
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-300" />
              </>
            )}
            {isAuthenticated && (
              <Link to="/add-listing">
                <DropdownMenuItem className="px-3 py-4 text-sm rounded-none">
                  Register your shed
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuItem className="px-3 py-4 text-sm rounded-none">
              Help Center
            </DropdownMenuItem>

            {isAuthenticated && (
              <DropdownMenuItem
                className="px-3 py-4 text-sm rounded-none text-theme hover:!text-theme"
                onClick={logout}
              >
                Log out <LogOutIcon color="var(--color-theme)" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <AuthDialog
          authDialogOpen={authDialogOpen}
          toggleAuthDialog={toggleAuthDialog}
          onOpenChange={(open) =>
            toggleAuthDialog((prev) => ({ ...prev, open: open }))
          }
        />
      </div>
    </nav>
  )
}

export default Navbar
