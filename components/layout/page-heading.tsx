import { cn } from '@/lib/utils'

const PageHeading = ({
    heading,
    description,
    className,
}: {
    heading: string
    description: string
    className?: string
}) => {
    return (
        <div className={cn('mb-8 space-y-1', className)}>
            <h1 className="text-2xl font-bold text-black">{heading}</h1>
            <p className="text-gray">{description}</p>
        </div>
    )
}

export default PageHeading
