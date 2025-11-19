import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
    return (
        <textarea
            data-slot="textarea"
            className={cn(
                'border-border placeholder:text-gray aria-invalid:ring-destructive/20 bg-background focus-visible:ring-primary flex field-sizing-content min-h-28 w-full rounded-md border px-3 py-2 text-sm text-black transition-[color,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            {...props}
        />
    )
}

export { Textarea }
