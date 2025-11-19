import axios from '@/lib/axios'
import { deleteCookie, setCookie } from '@/lib/cookie'
import { EMAIL_VERIFY_PAGE } from '@/lib/redirect'
import { userRepository } from '@/repositories/user'
import { useStore } from '@/store'
import {
    IForgotPassword,
    ILogin,
    IRegister,
    IResetPassword,
} from '@/types/auth'
import { useRouter } from 'next/navigation'

export const useAuth = () => {
    const router = useRouter()

    const fetchUser = async () => {
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
    }

    const login = async (params: ILogin) => {
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

    const register = async (params: IRegister) => {
        try {
            await axios.post('/auth/register', params)
            await login({
                email: params.email,
                password: params.password,
                redirect: params.redirect || '',
            })
        } catch (e) {
            throw e
        }
    }

    const forgotPassword = async (params: IForgotPassword) => {
        try {
            await axios.post('/auth/password/forgot', params)
        } catch (e) {
            throw e
        }
    }

    const resetPassword = async (url: string, params: IResetPassword) => {
        try {
            await axios.post(url, params)
        } catch (e) {
            throw e
        }
    }

    const resendEmailVerification = async ({
        redirect,
    }: {
        redirect?: string
    }) => {
        try {
            await axios.post('/auth/email/verify/resend', {
                redirect,
            })
        } catch {}
    }

    const verifyEmail = async (url: string) => {
        try {
            await axios.get(url)
            await fetchUser()
            return true
        } catch {
            return false
        }
    }

    const logout = async () => {
        try {
            await axios.post('/auth/logout')
            deleteCookie('auth.__token')
            useStore.setState({ auth: null })

            // NOTE: Refresh router after logout to refresh all data
        } catch {}
    }

    return {
        user: useStore.getState().auth,
        loggedIn: !!useStore.getState().auth,
        isEmailVerified: !!useStore.getState()?.auth?.email_verified_at,
        fetchUser,
        login,
        register,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        verifyEmail,
        logout,
    }
}
