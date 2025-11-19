'use client'

import ScreenLoading from '@/components/layout/screen-loading'
import { useAuth } from '@/hooks/use-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function VerifyRedirect() {
    const { verifyEmail } = useAuth()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            verifyEmail(token)
                .then(() => {
                    if (searchParams.get('redirect')) {
                        router.replace(searchParams.get('redirect') || '/app')
                    } else {
                        router.replace('/app')
                    }
                })
                .catch(() => setLoading(false))
        } else {
        }
    }, [searchParams, router, verifyEmail])

    if (loading) {
        return <ScreenLoading />
    }

    return <></>
}
