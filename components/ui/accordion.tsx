'use client'

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon, Plus } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn('', className)}
            {...props}
        />
    )
}
function AccordionItemTwo({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn(
                'border-border data-[state=open]:border-primary/80 rounded-xl border bg-white shadow-sm transition sm:rounded-2xl',
                className,
            )}
            {...props}
        />
    )
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <div className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'group text-gray data-[state=open]:text-primary-dark relative flex w-full cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm/4 outline-none hover:text-black [&[data-state=open]>svg]:rotate-180',
                    className,
                )}
                {...props}
            >
                {children}
                <ChevronDownIcon className="arrow pointer-events-none ml-auto size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
        </div>
    )
}

function AccordionTriggerTwo({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <div className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    'group relative z-10 flex w-full cursor-pointer items-center gap-2.5 rounded-lg p-3 text-left text-base/5.5 font-medium outline-none hover:text-black sm:p-5 lg:text-lg/6 [&[data-state=open]>svg]:rotate-90 [&[data-state=open]>svg_path:nth-of-type(1)]:hidden',
                    className,
                )}
                {...props}
            >
                {children}
                <Plus className="arrow ml-auto size-5 shrink-0 duration-200" />
            </AccordionPrimitive.Trigger>
        </div>
    )
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="overflow-hidden data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.2s_ease-out]"
            {...props}
        >
            <div className={cn('pt-1', className)}>{children}</div>
        </AccordionPrimitive.Content>
    )
}

function AccordionContentTwo({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="text-gray overflow-hidden text-base/5.5 data-[state=closed]:animate-[accordion-up_0.2s_ease-out] data-[state=open]:animate-[accordion-down_0.2s_ease-out]"
            {...props}
        >
            <div
                className={cn(
                    'border-border mx-3 border-t py-3 sm:mx-5 sm:py-4',
                    className,
                )}
            >
                {children}
            </div>
        </AccordionPrimitive.Content>
    )
}

export {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
    AccordionTriggerTwo,
    AccordionItemTwo,
    AccordionContentTwo,
}
