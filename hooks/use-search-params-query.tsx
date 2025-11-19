'use client'
import { useCallback } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface Filters {
    [key: string]:
        | string
        | string[]
        | number
        | number[]
        | number[][]
        | undefined
}

const useSearchParamsQuery = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const applyFilters = useCallback(
        (
            filters: Filters,
            options: { scroll: boolean } = { scroll: true },
        ): void => {
            // const current = new URLSearchParams(Array.from(searchParams.entries()));
            const current = new URLSearchParams(window.location.search)

            // Update as necessary
            Object.entries(filters).forEach(([key, value]) => {
                if (!value) {
                    current.delete(key)
                } else {
                    if (Array.isArray(value)) {
                        // Handle array values
                        current.delete(key)
                        value.forEach((item) => {
                            current.append(key, item.toString())
                        })
                    } else {
                        current.set(key, value as string)
                    }
                }
            })

            const search = current.toString()
            const query = search ? `?${search}` : ''

            router.push(`${pathname}${query}`, options)
        },
        [pathname, router],
    )

    const getLink = (filters: Filters, replacePath?: string) => {
        const current = new URLSearchParams(window.location.search)

        // Update as necessary
        Object.entries(filters).forEach(([key, value]) => {
            if (!value) {
                current.delete(key)
            } else {
                if (Array.isArray(value)) {
                    // Handle array values
                    current.delete(key)
                    value.forEach((item) => {
                        current.append(key, item.toString())
                    })
                } else {
                    current.set(key, value as string)
                }
            }
        })

        const search = current.toString()
        const query = search ? `?${search}` : ''

        return `${replacePath || pathname}${query}`
    }
    return { applyFilters, searchParams, getLink }
}

export default useSearchParamsQuery
