import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import StoreInitializer from '@/store/StoreInitializer'
import { connection } from 'next/server'
import { userRepository } from '@/repositories/user'
import { Toaster } from 'react-hot-toast'
import 'react-tooltip/dist/react-tooltip.css'
import ProgressBar from '@/components/layout/progress-bar'

const inter = Inter({ subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Main Title - Project',
    description: 'Main description - Project. Lorem ipsum dolor sit',
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    await connection()

    const user = await userRepository.getUser()

    return (
        <html lang="en">
            <body
                className={cn(
                    inter.className,
                    'text-base font-normal text-black antialiased',
                )}
            >
                <StoreInitializer auth={user} />
                <ProgressBar />
                <Toaster
                    toastOptions={{
                        success: {
                            style: {
                                background: 'green',
                                color: 'white',
                                fontSize: '14px',
                            },
                        },
                        error: {
                            style: {
                                background: 'red',
                                color: 'white',
                                fontSize: '14px',
                            },
                        },
                    }}
                />
                <main>{children}</main>
            </body>
        </html>
    )
}
