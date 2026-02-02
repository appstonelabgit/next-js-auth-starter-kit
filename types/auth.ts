export interface LoginPayload {
    email: string
    password: string
    redirect?: string
}

export interface RegisterPayload {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    redirect?: string
}

export interface ForgotPasswordPayload {
    email: string
}

export interface ResetPasswordPayload {
    password: string
    password_confirmation: string
}

export interface AuthUser {
    id: number
    email: string
    name: string
    phone: string
    email_verified_at: string | null
}

export type ILogin = LoginPayload
export type IRegister = RegisterPayload
export type IForgotPassword = ForgotPasswordPayload
export type IResetPassword = ResetPasswordPayload
export type IAuth = AuthUser
