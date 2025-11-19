'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface IProp {
    className?: string
    href: string
    active?: string
    target?: string
    targetPath?: string
    rel?: string
    children: React.ReactNode
    onClick?: () => void
    isAccordion?: boolean
    isSubAccordion?: boolean
    landingLink?: boolean
}
export default function NavLink({
    className,
    href,
    active,
    target,
    rel,
    children,
    onClick,
    targetPath,
    isAccordion,
    isSubAccordion,
    landingLink,
}: IProp) {
    const pathName = usePathname()

    return (
        <Link
            href={href}
            target={target}
            rel={rel}
            className={cn(
                'group relative',
                {
                    'sub-menu-active':
                        (active ||
                            (!active && pathName === href) ||
                            (targetPath && pathName.startsWith(targetPath))) &&
                        (isAccordion || isSubAccordion),

                    active:
                        (active ||
                            (!active && pathName === href) ||
                            (targetPath && pathName.startsWith(targetPath))) &&
                        !(isAccordion || isSubAccordion),
                },
                landingLink ? 'landing-nav-item' : 'nav-item',
                className,
            )}
            onClick={onClick && onClick}
        >
            {children}
            {isAccordion && (
                <div className="absolute top-1/2 -left-1 flex -translate-y-1/2 flex-col items-center gap-1">
                    <div
                        className={cn(
                            'h-0.5 w-2.5 rounded-full bg-gray-700/50',
                            pathName === href && 'bg-primary',
                        )}
                    ></div>
                </div>
            )}
        </Link>
    )
}
