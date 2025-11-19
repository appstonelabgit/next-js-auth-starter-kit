'use client'
import React, { useEffect, useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import Link from 'next/link'
import {
    ChevronRight,
    Cog,
    LayoutDashboard,
    LogOut,
    UserCog,
    X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import NavLink from '@/components/layout/nav-link'
import { useAuth } from '@/hooks/use-auth'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import Image from 'next/image'

const Sidebar = () => {
    const pathName = usePathname()
    const router = useRouter()

    const { logout } = useAuth()

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
        const mainContent = document.getElementById('main-content')

        if (mainContent) {
            mainContent.style.marginLeft = isSidebarOpen ? '260px' : '60px'
        }
    }

    const toggleSidebarResponsive = () => {
        document.getElementById('sidebar')?.classList.remove('open')
        document.getElementById('overlay')?.classList.toggle('open')
    }
    // const selectedLayout = useStore((state) => state.selectedLayout)

    useEffect(() => {
        if (document?.getElementById('overlay')?.classList?.contains('open')) {
            toggleSidebarResponsive()
        }
    }, [pathName])

    const handleLogout = async () => {
        try {
            await logout()
            router.refresh()
        } catch {}
    }

    return (
        <>
            <div
                id="overlay"
                className="fixed inset-0 z-30 hidden bg-black/50"
                onClick={toggleSidebarResponsive}
            ></div>

            <div
                id="sidebar"
                className={`sidebar border-border bg-background fixed top-0 -left-[260px] z-40 flex h-dvh flex-col space-y-5 rounded-none border-r transition-all duration-300 lg:left-0 lg:h-[calc(100vh-0px)] ${
                    isSidebarOpen ? 'closed w-[60px]' : 'w-[260px]'
                }`}
            >
                <button
                    type="button"
                    onClick={toggleSidebar}
                    className="absolute top-8 -right-2.5 hidden size-6 cursor-pointer place-content-center rounded-full border border-gray-300 bg-white text-black lg:grid"
                >
                    <ChevronRight
                        className={`h-4 w-4 ${isSidebarOpen ? 'rotate-0' : 'rotate-180'}`}
                    />
                </button>
                <div className="border-border logo flex items-start justify-between border-b px-4 py-3 lg:px-6">
                    <Link href="/app" className="flex items-center gap-2">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={160}
                            height={40}
                            className="logo-full h-5 w-auto"
                        />
                        <Image
                            src="/images/logo-icon.svg"
                            alt="logo icon"
                            width={160}
                            height={40}
                            className="logo-icon hidden h-5 w-auto shrink-0"
                        />
                    </Link>
                    <button
                        type="button"
                        className="lg:hidden"
                        onClick={toggleSidebarResponsive}
                    >
                        <X className="-mt-2 ml-auto size-4 hover:text-black ltr:-mr-2 rtl:-ml-2" />
                    </button>
                </div>

                <Accordion
                    type="single"
                    value={
                        pathName.startsWith('/app/settings')
                            ? 'item-2'
                            : undefined
                    }
                    collapsible
                    className="sidemenu grow space-y-0.5 overflow-x-hidden overflow-y-auto px-4 pb-10 transition-all"
                    key={pathName}
                >
                    <NavLink href="/app">
                        <LayoutDashboard className="size-4.5 shrink-0" />
                        <span>Dashboard</span>
                    </NavLink>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="hover:bg-primary/10 group hover:text-primary accordion-trigger flex items-center gap-2.5">
                            <Cog className="size-4.5 shrink-0" />
                            <span>Settings</span>
                        </AccordionTrigger>
                        <AccordionContent className="accordion-content ml-6 space-y-0.5">
                            <NavLink
                                href="/app/settings/profile"
                                className={`group ${
                                    pathName.includes(
                                        '/app/settings/profile',
                                    ) && 'active'
                                }`}
                            >
                                <UserCog className="size-4.5 shrink-0" />
                                <span>Profile</span>
                            </NavLink>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div className="logout bg-background border-border sticky bottom-0 mt-2.5 border-t px-4 py-2 transition-all lg:p-4">
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
                </div>
            </div>
        </>
    )
}

export default Sidebar
