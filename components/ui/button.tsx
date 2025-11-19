import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import ButtonLoader from '@/components/ui/button-loader'

const buttonVariants = cva(
    'inline-flex items-center shrink-0 cursor-pointer justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative duration-300',
    {
        variants: {
            variant: {
                default:
                    'hover:bg-primary text-white bg-primary-dark shadow hover:shadow-lg',
                destructive:
                    'bg-danger text-danger-foreground shadow-sm hover:bg-danger/90 text-white',
                outline:
                    'border border-border bg-background hover:bg-primary-dark hover:text-white shadow !py-[7px] shadow-sm',
                'outline-general':
                    'border border-border text-black bg-transparent shadow-sm hover:bg-primary hover:text-white rounded-md px-3 !py-[7px]',
                ghost: '',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'px-4 py-2',
                sm: '',
                lg: '',
                icon: 'px-2',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
    loading?: boolean
    disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant,
            size,
            asChild = false,
            loading = false,
            disabled = false,
            children,
            ...props
        },
        ref,
    ) => {
        const Comp = asChild ? Slot : 'button'

        return (
            <Comp
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        className: loading
                            ? `ring-0! focus:ring-0! ${className}`
                            : className,
                    }),
                )}
                ref={ref}
                disabled={loading || disabled}
                {...props}
            >
                {loading ? (
                    <>
                        <ButtonLoader message="" />{' '}
                        <div className={cn(loading && 'invisible flex')}>
                            {children}
                        </div>
                    </>
                ) : (
                    children
                )}
            </Comp>
        )
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
