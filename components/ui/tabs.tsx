'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'

import { cn } from '@/lib/utils'

function Tabs({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
    return (
        <TabsPrimitive.Root
            data-slot="tabs"
            className={cn('flex flex-col gap-2', className)}
            {...props}
        />
    )
}

function TabsList({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
    return (
        <TabsPrimitive.List
            data-slot="tabs-list"
            className={cn(
                'bg-muted text-muted-foreground inline-flex items-center justify-start',
                className,
            )}
            {...props}
        />
    )
}

function TabsTrigger({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "text-gray hover:bg-primary/10 data-[state=active]:bg-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:outline-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    )
}
function TabsTriggerTwo({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
    return (
        <TabsPrimitive.Trigger
            data-slot="tabs-trigger"
            className={cn(
                "text-gray hover:bg-primary/10 ring-border data-[state=active]:ring-primary data-[state=active]:bg-primary inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium whitespace-nowrap shadow-sm ring-1 transition-[color,box-shadow] ring-inset focus-visible:outline-0 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-white data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
                className,
            )}
            {...props}
        />
    )
}

function TabsContent({
    className,
    ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
    return (
        <TabsPrimitive.Content
            data-slot="tabs-content"
            className={cn('flex-1 outline-none', className)}
            {...props}
        />
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, TabsTriggerTwo }
