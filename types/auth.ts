export type ILogin = {
    email: string
    password: string
    redirect?: string
}

export type IRegister = {
    first_name: string
    last_name: string
    email: string
    password: string
    password_confirmation: string
    redirect?: string
}

export type IForgotPassword = {
    email: string
}

export type IResetPassword = {
    password: string
    password_confirmation: string
}

export type IAuth = {
    id: number
    email: string
    name: string
    phone: string
    email_verified_at: string
}
