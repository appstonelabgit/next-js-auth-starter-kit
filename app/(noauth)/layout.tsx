import { userRepository } from '@/repositories/user'
import { redirect } from 'next/navigation'
import { HOME_PAGE } from '@/lib/redirect'

export default async function NoAuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    const user = await userRepository.getUser()
    if (user) {
        redirect(HOME_PAGE)
    }

    return (
        <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight">
                        Welcome to Project
                    </h2>
                </div>
                {children}
            </div>
        </div>
    )
}
