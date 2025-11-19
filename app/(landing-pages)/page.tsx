import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Home() {
    return (
        <div className="grid place-content-center py-20">
            <div className="flex w-full flex-col justify-between gap-6 sm:flex-row sm:items-end lg:max-w-60 lg:flex-col lg:items-start lg:gap-10">
                <div>
                    <Link className="inline-flex items-center gap-2" href="/">
                        <Image
                            src="/images/logo.svg"
                            alt="logo"
                            width={160}
                            height={40}
                            className="h-10 w-auto"
                        />
                    </Link>
                    <p className="text-gray mt-3 text-base/5.5 font-medium">
                        Instantly provide support with your custom Project
                    </p>
                </div>
            </div>
        </div>
    )
}
