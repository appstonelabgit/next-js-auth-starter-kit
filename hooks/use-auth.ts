'use client'

import axios from '@/lib/axios'
import { deleteCookie, setCookie } from '@/lib/cookie'
import { EMAIL_VERIFY_PAGE } from '@/lib/redirect'
import { userRepository } from '@/repositories/user'
import { useStore } from '@/store'
import type {
    IForgotPassword,
    ILogin,
    IRegister,
    IResetPassword,
} from '@/types/auth'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

const PASSWORD_RESET_ENDPOINT = '/auth/password/reset'

export function useAuth() {
    const router = useRouter()
    const user = useStore((state) => state.auth)
    const loggedIn = Boolean(user)
    const isEmailVerified = Boolean(user?.email_verified_at)

    const fetchUser = useCallback(async () => {
        const isServer = typeof window === 'undefined'
        try {
            const data = await userRepository.getUser()
            useStore.setState({ auth: data })
            return data
        } catch {
            useStore.setState({ auth: null })
            if (!isServer) {
                deleteCookie('auth.__token')
            }
        }
        return null
    }, [])

    const verifyEmail = useCallback(
        async (token: string) => {
            try {
                await axios.get(`/auth/email/verify?token=${token}`)
                await fetchUser()
                return true
            } catch {
                return false
            }
        },
        [fetchUser],
    )

    async function login(params: ILogin) {
        try {
            const { data } = await axios.post('/auth/login', params)
            setCookie('auth.__token', data.token)
            await fetchUser()

            if (!data?.isVerified) {
                router.replace(
                    EMAIL_VERIFY_PAGE +
                        (params.redirect ? `?redirect=${params.redirect}` : ''),
                )
                return true
            }

            if (data.redirect) {
                router.replace(decodeURIComponent(data.redirect))
            }
            return true
        } catch {
            return false
        }
    }

    async function signUp(params: IRegister) {
        await axios.post('/auth/register', params)
        await login({
            email: params.email,
            password: params.password,
            redirect: params.redirect ?? '',
        })
    }

    async function forgotPassword(params: IForgotPassword) {
        await axios.post('/auth/password/forgot', params)
    }

    async function resetPassword(token: string, params: IResetPassword) {
        await axios.post(PASSWORD_RESET_ENDPOINT, { token, ...params })
    }

    async function resendEmailVerification(options?: { redirect?: string }) {
        try {
            await axios.post('/auth/email/verify/resend', {
                redirect: options?.redirect,
            })
        } catch {
            //
        }
    }

    async function logout() {
        try {
            await axios.post('/auth/logout')
            deleteCookie('auth.__token')
            useStore.setState({ auth: null })
        } catch {
            //
        }
    }

    return {
        user,
        loggedIn,
        isEmailVerified,
        fetchUser,
        login,
        signUp,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        verifyEmail,
        logout,
    }
}
