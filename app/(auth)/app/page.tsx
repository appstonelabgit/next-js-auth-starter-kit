'use client'
import Pagination from '@/components/common/pagination'
import PageHeading from '@/components/layout/page-heading'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'
import SearchInput from '@/components/ui/search-input'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Bot,
    FileText,
    MessageSquare,
    Pencil,
    Trash2,
    Users,
} from 'lucide-react'

export default function Dashboard() {
    const lead = {
        data: [
            {
                id: 1,
                user_name: 'John Doe',
                email: 'john@example.com',
                mobile: '+911234567890',
                created_at: '2023-05-01T00:00:00.000Z',
            },
            {
                id: 2,
                user_name: 'Jane Doe',
                email: 'jane@example.com',
                mobile: '+911234567890',
                created_at: '2023-05-01T00:00:00.000Z',
            },
            {
                id: 3,
                user_name: 'John Doe',
                email: 'john@example.com',
                mobile: '+911234567890',
                created_at: '2023-05-01T00:00:00.000Z',
            },
            {
                id: 4,
                user_name: 'Jane Doe',
                email: 'jane@example.com',
                mobile: '+911234567890',
                created_at: '2023-05-01T00:00:00.000Z',
            },
            {
                id: 5,
                user_name: 'John Doe',
                email: 'john@example.com',
                mobile: '+911234567890',
                created_at: '2023-05-01T00:00:00.000Z',
            },
        ],
        meta: {
            current_page: 1,
            last_page: 5,
            per_page: 20,
        },
    }
    const loading = false

    return (
        <div className="@container space-y-8">
            <PageHeading
                heading="Dashboard"
                description="Welcome back! Here's what's happening with your project."
            />

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <Card className="relative space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Users this month
                            </h3>
                            <h4 className="text-[32px]/9 font-bold text-black">
                                100
                            </h4>
                        </div>
                        <span className="bg-primary/10 mt-2 grid size-12 shrink-0 place-content-center rounded-full">
                            <Bot className="text-primary size-6" />
                        </span>
                    </div>
                </Card>
                <Card className="relative space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Conversations this month
                            </h3>
                            <h4 className="text-[32px]/9 font-bold text-black">
                                50
                            </h4>
                        </div>
                        <span className="bg-primary/10 mt-2 grid size-12 shrink-0 place-content-center rounded-full">
                            <MessageSquare className="text-primary size-6" />
                        </span>
                    </div>
                </Card>
                <Card className="relative space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">Total users</h3>
                            <h4 className="text-[32px]/9 font-bold text-black">
                                30
                            </h4>
                        </div>
                        <span className="bg-primary/10 mt-2 grid size-12 shrink-0 place-content-center rounded-full">
                            <Users className="text-primary size-6" />
                        </span>
                    </div>
                </Card>
                <Card className="relative space-y-4 p-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium">
                                Total sources
                            </h3>
                            <h4 className="text-[32px]/9 font-bold text-black">
                                20
                            </h4>
                        </div>
                        <span className="bg-primary/10 mt-2 grid size-12 shrink-0 place-content-center rounded-full">
                            <FileText className="text-primary size-6" />
                        </span>
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                <div className="mb-6 flex flex-wrap items-start gap-4 md:mb-10">
                    <div className="flex w-full flex-wrap items-center justify-between gap-2">
                        <SearchInput className="max-w-xs" />
                        <div className="flex gap-2">
                            <Button type="button">Button</Button>
                            <Button type="button" variant={'outline'}>
                                Button
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-4 w-full overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Mobile No</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {loading ? (
                                [...Array(5)].map((_, index) => (
                                    <TableRow
                                        key={index}
                                        className="animate-pulse"
                                    >
                                        <TableCell>
                                            <div className="h-4 w-24 rounded bg-gray-300" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-48 rounded bg-gray-300" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-20 rounded bg-gray-300" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-16 rounded bg-gray-300" />
                                        </TableCell>
                                        <TableCell>
                                            <div className="h-4 w-16 rounded bg-gray-300" />
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : lead?.data.length > 0 ? (
                                lead?.data.map((row) => {
                                    return (
                                        <TableRow key={row.id}>
                                            <TableCell>
                                                <span className="block max-w-[360px] truncate rounded px-2 py-1 text-sm">
                                                    {row.user_name || '-'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="block max-w-[360px] truncate rounded px-2 py-1 text-sm">
                                                    {row.email || '-'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="block max-w-[360px] truncate rounded px-2 py-1 text-sm">
                                                    {row.mobile || '-'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {row.created_at || '-'}
                                            </TableCell>
                                            <TableCell className="flex gap-2">
                                                <Button
                                                    variant="outline-general"
                                                    size="icon"
                                                    className="border-0 bg-transparent shadow-none"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <ConfirmDialog
                                                    title="Delete Lead"
                                                    description="Are you sure you want to delete this lead? This action cannot be undone."
                                                    confirmText="Delete"
                                                    cancelText="Cancel"
                                                    onConfirm={() =>
                                                        console.log('delete')
                                                    }
                                                    confirmButtonClassName="bg-primary text-white hover:bg-red-500/10 hover:text-red-600"
                                                    trigger={
                                                        <Button
                                                            variant="outline-general"
                                                            size="icon"
                                                            className="border-0 bg-transparent shadow-none hover:bg-red-500/10"
                                                        >
                                                            <Trash2 className="h-4 w-4 text-red-600" />
                                                        </Button>
                                                    }
                                                />
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="text-center"
                                    >
                                        No leads found
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>

                <Pagination
                    dataLength={lead?.data.length}
                    currentPage={lead?.meta?.current_page ?? 1}
                    totalPages={lead?.meta?.last_page ?? 1}
                    perPage={lead?.meta?.per_page ?? 20}
                    alignClass="justify-end"
                    isShowLimit={true}
                />
            </Card>
        </div>
    )
}
