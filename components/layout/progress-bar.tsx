'use client'
import NextTopLoader from 'holy-loader'

export default function ProgressBar() {
    return (
        <NextTopLoader
            color="#8059e3"
            height={3}
            showSpinner={false}
            zIndex={10000}
        />
    )
}
