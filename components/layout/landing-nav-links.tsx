'use client'

import NavLink from '@/components/layout/nav-link'
import { cn } from '@/lib/utils'

const LandingNavLinks = ({ className }: { className?: string }) => {
    // const pathName = usePathname()

    return (
        <ul
            className={cn(
                'flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-6 md:p-0',
                className,
            )}
        >
            <li>
                <NavLink href="/" landingLink>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink href="/contact" landingLink>
                    Contact
                </NavLink>
            </li>
        </ul>
    )
}
export default LandingNavLinks
