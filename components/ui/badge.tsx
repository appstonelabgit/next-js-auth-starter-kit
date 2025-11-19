import * as React from 'react'

export const Badge = ({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}) => (
    <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${className}`}
    >
        {children}
    </span>
)

// Badge.displayName = 'Badge'
