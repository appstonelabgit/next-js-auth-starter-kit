'use client'

import { useRef } from 'react'
import { useStore } from '@/store'

import { IAuth } from '@/types/auth'

type IState = {
    auth: IAuth
}

const StoreInitializer = ({ auth }: IState) => {
    const initialized = useRef(false)

    if (!initialized.current) {
        useStore.setState({ auth })
        initialized.current = true
    }
    return null
}

export default StoreInitializer
