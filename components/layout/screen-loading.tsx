'use client'
import IconLoaderDots from '@/components/icons/icon-loader-dots'

export default function ScreenLoading({
    message = 'Loading...',
}: {
    message?: string
}) {
    return (
        <div className="fixed inset-0 z-9999 flex min-h-screen w-full flex-col items-center justify-center bg-white">
            <div>
                <IconLoaderDots className="text-primary w-16" />
            </div>
            {message && <div className="mt-3 text-sm">{message}</div>}
        </div>
    )
}
