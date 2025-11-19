'use client'

import LandingNavLinks from '@/components/layout/landing-nav-links'
import { Button } from '@/components/ui/button'
import { Bot, Menu, X } from 'lucide-react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import Image from 'next/image'

const LandingHeader = () => {
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const pathName = usePathname()
    const { loggedIn } = useAuth()

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsOpenMenu(false)
    }, [pathName])

    return (
        <header className="border-border sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            <div className="container flex items-center justify-between gap-5 py-3 md:py-2">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/images/logo.svg"
                        alt="logo"
                        width={160}
                        height={30}
                        className="h-5 w-auto"
                    />
                </Link>
                <div className="flex items-center gap-3 md:gap-6 lg:gap-10">
                    <LandingNavLinks className="hidden md:flex" />
                    {loggedIn ? (
                        <Link href="/app">
                            <Button type="button">My account</Button>
                        </Link>
                    ) : (
                        <Link href="/login">
                            <Button type="button">Sign in</Button>
                        </Link>
                    )}
                    <Sheet open={isOpenMenu} onOpenChange={setIsOpenMenu}>
                        <SheetTrigger asChild>
                            <button
                                type="button"
                                className="duration-300 hover:opacity-80 md:hidden"
                            >
                                <Menu className="size-5" />
                            </button>
                        </SheetTrigger>
                        <SheetContent className="[&>_.close]:hidden">
                            <SheetTitle hidden></SheetTitle>
                            <SheetDescription hidden></SheetDescription>
                            <div className="sticky top-0 z-10 flex items-center justify-between bg-white p-4 shadow-sm">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2"
                                >
                                    <Bot className="text-primary size-6 shrink-0 lg:size-7" />
                                    <span className="text-lg font-bold text-black lg:text-xl">
                                        Project
                                    </span>
                                </Link>
                                <SheetClose>
                                    <X className="size-5" />
                                </SheetClose>
                            </div>
                            <LandingNavLinks />
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default LandingHeader
