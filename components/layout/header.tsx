'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, LogOut, Menu, UserCog } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

const Header = () => {
    const { logout } = useAuth()
    const router = useRouter()
    const toggleSidebar = () => {
        document.getElementById('sidebar')?.classList.toggle('open')
        document.getElementById('overlay')?.classList.toggle('open')
    }

    const handleLogout = async () => {
        try {
            await logout()
            router.refresh()
        } catch {}
    }

    return (
        <header className="fixed top-0 z-30 w-full bg-white shadow-sm lg:hidden">
            <div className="flex items-center justify-between gap-5 px-4 py-[15px] lg:px-5">
                <Link href="/app" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={160}
                        height={40}
                        className="h-5 w-auto"
                    />
                </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="group ml-auto flex cursor-pointer items-center gap-2.5 rounded-lg [&[data-state=open]>button>svg]:rotate-180">
                            <div className="size-10 shrink-0 overflow-hidden rounded-full">
                                <Image
                                    src={'/images/default_user.jpg'}
                                    width={70}
                                    height={70}
                                    className="h-full w-full object-cover"
                                    alt="Profile Img"
                                />
                            </div>
                            <div className="hidden space-y-1 lg:block">
                                <h5 className="text-gray line-clamp-1 text-[10px]/3 font-semibold">
                                    Welcome back
                                </h5>
                                <h2 className="hover:text-primary line-clamp-1 text-xs font-bold text-black">
                                    Admin
                                </h2>
                            </div>
                            <button
                                type="button"
                                className="-ml-1 text-black transition group-hover:opacity-70"
                            >
                                <ChevronDown className="h-4 w-4 shrink-0 duration-300" />
                            </button>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        sideOffset={12}
                        className="min-w-[200px] space-y-1 rounded-lg p-1.5 text-sm font-medium"
                    >
                        <DropdownMenuItem className="p-0" asChild>
                            <Link
                                href="/app/settings/profile"
                                className="flex items-center gap-1.5 rounded-lg px-3 py-2"
                            >
                                <UserCog className="size-[18px] shrink-0" />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="p-0" asChild>
                            <ConfirmDialog
                                title="Are you sure want to logout?"
                                description=""
                                confirmText="Logout"
                                onConfirm={async () => handleLogout()}
                                confirmButtonClassName="bg-primary text-white hover:bg-red-500/10 hover:text-red-600"
                                trigger={
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        className="text-gray w-full justify-start gap-3 border-0 bg-transparent px-3 py-2 text-base font-normal shadow-none hover:bg-red-500/10 hover:text-red-600"
                                    >
                                        <LogOut className="size-5!" />
                                        <span>Logout</span>
                                    </Button>
                                }
                            />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <button
                    type="button"
                    className="order-3 duration-300 hover:opacity-80 lg:hidden"
                    onClick={toggleSidebar}
                >
                    <Menu className="h-5 w-5" />
                </button>
            </div>
        </header>
    )
}

export default Header
