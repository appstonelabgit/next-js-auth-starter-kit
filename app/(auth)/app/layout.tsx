import { EMAIL_VERIFY_PAGE, LOGIN_PAGE } from '@/lib/redirect'
import { userRepository } from '@/repositories/user'
import { redirect } from 'next/navigation'

import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

export default async function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await userRepository.getUser()

    if (!user) {
        redirect(LOGIN_PAGE)
    }

    if (!user?.email_verified_at) {
        redirect(EMAIL_VERIFY_PAGE)
    }

    return (
        <div className="main-content">
            <Header />
            <Sidebar />
            <div
                id="main-content"
                className="bg-background mt-[70px] min-h-screen p-6 transition-all lg:mt-0 lg:ml-[260px]"
            >
                {children}
            </div>
        </div>
    )
}
