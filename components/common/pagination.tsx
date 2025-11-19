'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import useSearchParamsQuery from '@/hooks/use-search-params-query'
import { ArrowDown } from 'lucide-react'
interface RouterOptions {
    shallow?: boolean
    scroll?: boolean
    locale?: string
}

interface PaginationProps {
    totalPages: number
    currentPage: number
    dataLength: number
    alignClass?: string
    perPage?: number
    isShowLimit?: boolean
    routerOptions?: RouterOptions
}

const Pagination: React.FC<PaginationProps> = ({
    totalPages,
    currentPage,
    dataLength,
    alignClass,
    perPage,
    isShowLimit = false,
    routerOptions,
}) => {
    const { applyFilters, searchParams } = useSearchParamsQuery()

    const renderPageButtons = () => {
        const pageButtons = []

        const ButtonPage = (page: number) => (
            <li key={page}>
                <button
                    type="button"
                    className={cn(
                        'grid h-9 w-9 place-content-center rounded-md text-sm transition duration-300',
                        currentPage === page
                            ? 'bg-primary font-bold text-white shadow'
                            : 'hover:bg-primary/10 border border-gray-300 bg-white text-gray-800',
                    )}
                    // onClick={() => applyFilters({ page }, routerOptions)}
                    onClick={() =>
                        applyFilters(
                            { page },
                            { scroll: true, ...routerOptions },
                        )
                    }
                >
                    {page}
                </button>
            </li>
        )

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageButtons.push(ButtonPage(i))
            }
        } else {
            const startPage =
                currentPage <= 3
                    ? 1
                    : currentPage >= totalPages - 2
                      ? totalPages - 4
                      : currentPage - 2

            for (let i = startPage; i <= startPage + 4; i++) {
                pageButtons.push(ButtonPage(i))
            }

            if (startPage > 1) {
                pageButtons.unshift(
                    <li key="start-ellipsis">
                        <span className="px-2 text-gray-500">...</span>
                    </li>,
                )
            }

            if (startPage + 4 < totalPages) {
                pageButtons.push(
                    <li key="end-ellipsis">
                        <span className="px-2 text-gray-500">...</span>
                    </li>,
                )
            }
        }

        return pageButtons
    }

    return (
        <div
            className={cn(
                'mt-10 flex flex-wrap items-center gap-4',
                alignClass || 'justify-end',
            )}
        >
            {isShowLimit && !!dataLength && (
                <div>
                    <select
                        className="focus:border-primary border-border h-9 rounded-md border bg-white px-3 pr-7 text-sm text-black shadow-sm focus:ring-0 focus:outline-0"
                        value={perPage || 10}
                        onChange={(e) =>
                            applyFilters(
                                { per_page: e.target.value, page: 1 },
                                { scroll: true, ...routerOptions },
                            )
                        }
                    >
                        {[10, 20, 50, 100, 200].map((v) => (
                            <option key={v} value={v}>
                                {v}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {!!dataLength && (
                <div className="flex items-center gap-6 text-black">
                    <ul className="flex items-center gap-2">
                        <li>
                            <button
                                type="button"
                                className={cn(
                                    'grid h-9 w-9 place-content-center rounded-md border border-gray-300 text-gray-700 transition duration-300 hover:scale-99 hover:bg-gray-100',
                                    currentPage === 1 &&
                                        'pointer-events-none opacity-50',
                                )}
                                onClick={() =>
                                    applyFilters(
                                        {
                                            page:
                                                Number(
                                                    searchParams.get('page') ||
                                                        1,
                                                ) - 1,
                                        },
                                        { scroll: true, ...routerOptions },
                                    )
                                }
                                aria-label="previous page"
                            >
                                <ArrowDown className="size-3 rotate-90" />
                            </button>
                        </li>

                        {renderPageButtons()}

                        <li>
                            <button
                                type="button"
                                className={cn(
                                    'grid h-9 w-9 place-content-center rounded-md border border-gray-300 text-gray-700 transition duration-300 hover:scale-99 hover:bg-gray-100',
                                    currentPage === totalPages &&
                                        'pointer-events-none opacity-50',
                                )}
                                onClick={() =>
                                    applyFilters(
                                        {
                                            page:
                                                Number(
                                                    searchParams.get('page') ||
                                                        1,
                                                ) + 1,
                                        },
                                        { scroll: true, ...routerOptions },
                                    )
                                }
                                aria-label="next page"
                            >
                                <ArrowDown className="size-3 -rotate-90" />
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Pagination
