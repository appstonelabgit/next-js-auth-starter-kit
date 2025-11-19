'use client'

import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, Lock } from 'lucide-react'

import { cn } from '@/lib/utils'

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
        labelName?: string
        labelProps?: React.DetailedHTMLProps<
            React.LabelHTMLAttributes<HTMLLabelElement>,
            HTMLLabelElement
        >
        labelNote?: string
        rightSection?: React.ReactNode
        rootClassName?: string
        loading?: boolean
        locked?: boolean
    }
>(
    (
        {
            className,
            labelNote,
            rootClassName,
            children,
            labelName,
            labelProps,
            rightSection,
            locked,
            ...props
        },
        ref,
    ) => (
        <div className={cn('', rootClassName)}>
            <div className="flex items-center justify-between gap-3">
                <div>
                    {!!labelName && (
                        <label
                            className="inline-flex items-center gap-1.5 text-sm leading-5 font-medium text-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            {...labelProps}
                        >
                            {labelName}
                            {locked && (
                                <Lock className="text-primary-dark size-4" />
                            )}
                        </label>
                    )}
                    {!!labelNote && (
                        <span className="text-xs text-gray-300">
                            {labelNote}
                        </span>
                    )}
                </div>
                {rightSection}
            </div>
            <SelectPrimitive.Trigger
                ref={ref}
                className={cn(
                    'focus:border-primary border-border/80 hover:border-border mt-1.5 flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm placeholder:text-gray-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
                    className,
                )}
                {...props}
            >
                {children}
                <div className="flex items-center gap-3">
                    <SelectPrimitive.Icon asChild>
                        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
                    </SelectPrimitive.Icon>
                </div>
            </SelectPrimitive.Trigger>
        </div>
    ),
)
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollUpButton
        ref={ref}
        className={cn(
            'flex cursor-default items-center justify-center py-1',
            className,
        )}
        {...props}
    >
        <ChevronUp className="h-4 w-4" />
    </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.ScrollDownButton
        ref={ref}
        className={cn(
            'flex cursor-default items-center justify-center py-1',
            className,
        )}
        {...props}
    >
        <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
    SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                'border-gray/20 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-96 w-full overflow-hidden rounded-md border bg-white shadow-md',
                position === 'popper' &&
                    'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                className,
            )}
            position={position}
            {...props}
        >
            <SelectScrollUpButton />
            <SelectPrimitive.Viewport
                className={cn(
                    'p-1',
                    position === 'popper' &&
                        'h-(--radix-select-trigger-height) w-full min-w-(--radix-select-trigger-width)',
                )}
            >
                {children}
            </SelectPrimitive.Viewport>
            <SelectScrollDownButton />
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Label>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Label
        ref={ref}
        className={cn('py-1.5 pr-2 pl-8 text-sm font-semibold', className)}
        {...props}
    />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
        afterContent?: React.ReactNode
        indicator?: boolean
    }
>(({ className, children, afterContent, indicator = true, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            'focus:bg-accent focus:text-accent-foreground hover:bg-primary/5 data-[state=checked]:bg-primary/5 relative mt-1 flex w-full cursor-pointer items-center rounded-sm py-2 pl-2 text-xs outline-none select-none first:mt-0 data-disabled:pointer-events-none data-disabled:pr-2 data-disabled:opacity-50',
            className,
            indicator ? 'pr-8' : 'pr-2',
        )}
        {...props}
    >
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
        {indicator && (
            <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                <SelectPrimitive.ItemIndicator>
                    <Check className="size-3.5" />
                </SelectPrimitive.ItemIndicator>
            </span>
        )}
        {afterContent}
    </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Separator>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
    <SelectPrimitive.Separator
        ref={ref}
        className={cn('bg-muted -mx-1 my-1 h-px', className)}
        {...props}
    />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
    Select,
    SelectGroup,
    SelectValue,
    SelectTrigger,
    SelectContent,
    SelectLabel,
    SelectItem,
    SelectSeparator,
    SelectScrollUpButton,
    SelectScrollDownButton,
}
