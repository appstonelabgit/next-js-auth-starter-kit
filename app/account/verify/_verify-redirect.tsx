'use client'

import ScreenLoading from '@/components/layout/screen-loading'
import { useAuth } from '@/hooks/use-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyRedirect(props: { token?: string }) {
    const { verifyEmail } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(!!props.token)

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            verifyEmail(token)
                .then(() => {
                    const redirectTo = searchParams.get('redirect')
                    router.replace(
                        redirectTo ? decodeURIComponent(redirectTo) : '/app',
                    )
                })
                .catch(() => setLoading(false))
        }
    }, [searchParams, router, verifyEmail])

    if (loading) {
        return <ScreenLoading />
    }

    return <></>
}
