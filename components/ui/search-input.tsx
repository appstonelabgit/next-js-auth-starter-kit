'use client'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
import debounce from 'lodash.debounce'
import useSearchParamsQuery from '@/hooks/use-search-params-query'
import { Input } from '@/components/ui/input'

export default function SearchInput({
    searchKey = 'search',
    ...inputProps
}: {
    searchKey?: string
} & React.InputHTMLAttributes<HTMLInputElement>) {
    const searchRef = useRef<HTMLInputElement>(null)
    const searchParams = useSearchParams()
    const { applyFilters } = useSearchParamsQuery()

    const debouncedSearch = debounce((search) => {
        applyFilters({ [searchKey]: search, page: 1 })
    }, 500)

    useEffect(() => {
        const query = searchParams.get(searchKey) || ''
        if (searchRef.current) {
            if (!!query && !searchRef.current.value) {
                searchRef.current.value = query
            } else if (!query) {
                searchRef.current.value = ''
            }
        }
    }, [searchParams, searchKey])

    return (
        <Input
            ref={searchRef}
            type="search"
            placeholder="Search"
            {...inputProps}
            onChange={(e) => {
                debouncedSearch(e.target.value)
            }}
        />
    )
}
