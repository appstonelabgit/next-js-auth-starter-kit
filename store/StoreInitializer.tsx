'use client'

import { useStore } from '@/store'
import type { IAuth } from '@/types/auth'
import { useRef } from 'react'

interface StoreInitializerProps {
    auth: IAuth | null
}

export default function StoreInitializer({ auth }: StoreInitializerProps) {
    const initialized = useRef(false)
    if (!initialized.current) {
        useStore.setState({ auth })
        initialized.current = true
    }
    return null
}
