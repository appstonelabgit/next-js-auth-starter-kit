import LandingFooter from '@/components/layout/landing-footer'
import LandingHeader from '@/components/layout/landing-header'

export default async function LandingLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-white text-base/5.5">
            <LandingHeader />
            <div className="grow">{children}</div>
            <LandingFooter />
        </div>
    )
}
