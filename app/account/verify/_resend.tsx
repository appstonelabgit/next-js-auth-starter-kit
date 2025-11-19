'use client'

import { useAuth } from '@/hooks/use-auth'
import { useSearchParams } from 'next/navigation'

export default function Resend({ children }: { children: React.ReactNode }) {
    const { resendEmailVerification } = useAuth()
    const searchParams = useSearchParams()

    return (
        <button
            type="button"
            className="cursor-pointer text-[red] transition hover:underline"
            onClick={() => {
                resendEmailVerification({
                    redirect: encodeURIComponent(
                        searchParams.get('redirect') || '/app',
                    ),
                })
            }}
        >
            {children}
        </button>
    )
}
