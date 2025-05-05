import { AppLogo } from '../Logo'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Menu as MenuIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import NoAvatarSVG from '@/assets/user/no_avatar.svg'
import AuthDialog from '../auth/AuthDialog'
import { useToggle } from '@/hooks/useToggle'
import { useGlobalStore } from '@/store/store'
import type { HomeViewType } from '@/types/global'
import { cn } from '@/lib/utils'

const HOME_VIEW_TYPE: HomeViewType[] = ['rent', 'buy']

const Navbar = () => {
  const [authDialogOpen, toggleAuthDialog] = useToggle(false)

  const setHomeViewType = useGlobalStore(
    (store) => store.setter.setHomeViewType,
  )
  const homeViewType = useGlobalStore((store) => store.value.homeViewType)

  return (
    <nav className="flex items-center gap-4 justify-between text-lg mb-2">
      <AppLogo />
      <div className="flex items-center">
        {HOME_VIEW_TYPE.map((item) => (
          <div
            key={item}
            onClick={() => setHomeViewType(item)}
            className={cn(
              'cursor-pointer px-4 py-2 rounded-full text-[1.06rem]',
              {
                'hover:bg-zinc-100': item !== homeViewType,
              },
            )}
          >
            <p
              className={cn(
                'capitalize text-neutral-600 select-none font-medium transition-all',
                {
                  'text-black font-semibold': item === homeViewType,
                },
              )}
              style={{ minWidth: `${item.length}ch` }} // Prevents width shift
            >
              {item}
            </p>
          </div>
        ))}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="border-2 border-zinc-300 hover:shadow-[0px_10px_19px_rgba(0,0,0,0.1)] transition-all py-2 px-4 rounded-full flex items-center gap-4 cursor-pointer">
            <MenuIcon width={'1.2rem'} />
            <Avatar className="w-[35px] h-[35px]">
              <AvatarImage src={NoAvatarSVG} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="px-0 min-w-[240px] "
        >
          <DropdownMenuItem
            className="font-semibold px-3 py-4 text-sm rounded-none"
            onClick={toggleAuthDialog}
          >
            Sign Up
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-3 py-4 text-sm rounded-none"
            onClick={toggleAuthDialog}
          >
            Login In
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-zinc-300" />
          <DropdownMenuItem className="px-3 py-4 text-sm rounded-none">
            Register your shed
          </DropdownMenuItem>
          <DropdownMenuItem className="px-3 py-4 text-sm rounded-none">
            Help Center
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AuthDialog open={authDialogOpen} onOpenChange={toggleAuthDialog} />
    </nav>
  )
}

export default Navbar
