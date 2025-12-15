import { HOME_PAGE, LOGIN_PAGE } from '@/lib/redirect'
import Logout from '@/app/account/verify/_logout'
import Resend from '@/app/account/verify/_resend'
import VerifyRedirect from '@/app/account/verify/_verify-redirect'
import { userRepository } from '@/repositories/user'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default async function Page(props: {
    searchParams: Promise<{
        token?: string
    }>
}) {
    const searchParams = await props.searchParams
    const user = await userRepository.getUser()
    if (!user) {
        redirect(LOGIN_PAGE)
    }

    if (user.email_verified_at) {
        redirect(HOME_PAGE)
    }

    return (
        <>
            <VerifyRedirect token={searchParams?.token} />

            <div className="bg-background flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="w-full max-w-150 space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight">
                            Welcome to Project
                        </h2>
                    </div>
                    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center sm:min-h-[calc(100vh-168px)]">
                        <div className="border-border mx-auto w-full space-y-6 rounded-lg border bg-white p-6 text-center shadow-sm">
                            <h1 className="text-2xl leading-7 font-semibold">
                                Confirm your email
                            </h1>

                            <p>
                                We&apos;ve sent an email to your inbox - please
                                click that link to activate your account.
                                Didn&apos;t receive it?{' '}
                                <Resend>Click here</Resend> to resend!
                            </p>

                            <div className="mt-8 text-center">
                                <Logout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
