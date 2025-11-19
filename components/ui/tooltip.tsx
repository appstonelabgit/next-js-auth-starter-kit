'use client'
import React from 'react'
import { Tooltip as ReactTooltip } from 'react-tooltip'

export default function Tooltip({
    children,
    ...props
}: {
    id: string
    place?: 'top' | 'right' | 'bottom' | 'left'
    className?: string
    clickable?: boolean
    positionStrategy?: 'fixed' | 'absolute'
    children: React.ReactNode
}) {
    return <ReactTooltip {...props}>{children}</ReactTooltip>
}
