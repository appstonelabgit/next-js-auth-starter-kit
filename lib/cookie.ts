import {
    setCookie as set,
    getCookie as get,
    deleteCookie as destroy,
} from 'cookies-next'

export const setCookie = (
    key: string,
    value: string,
    args = {
        maxAge: 31536000,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
    },
) => {
    set(key, value, args)
}

export const getCookie = (key: string, options: unknown = null) => {
    return options ? get(key, options) : get(key)
}

export const deleteCookie = (key: string, options?: null) => {
    return options ? destroy(key, options) : destroy(key)
}
