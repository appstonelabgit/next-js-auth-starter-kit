import { cn } from '@/lib/utils'

interface CharacterCounterProps {
    currentLength: number
    maxLength: number
    className?: string
    showCircularProgress?: boolean
}

const CharacterCounter = ({
    currentLength,
    maxLength,
    className,
    showCircularProgress = true,
}: CharacterCounterProps) => {
    const remaining = maxLength - currentLength
    const isOverLimit = remaining < 0
    const percentage = Math.max(
        0,
        Math.min(100, (currentLength / maxLength) * 100),
    )

    // Calculate stroke dasharray for the circle
    const radius = 6
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className={cn('flex items-center gap-1', className)}>
            {showCircularProgress && (
                <div className="relative h-4 w-4">
                    <svg
                        className="h-4 w-4 -rotate-90 transform"
                        viewBox="0 0 16 16"
                    >
                        {/* Background circle */}
                        <circle
                            cx="8"
                            cy="8"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            className="text-gray-200"
                        />
                        {/* Progress circle */}
                        <circle
                            cx="8"
                            cy="8"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            strokeLinecap="round"
                            strokeDasharray={strokeDasharray}
                            strokeDashoffset={strokeDashoffset}
                            className={cn(
                                'transition-all duration-300 ease-in-out',
                                {
                                    'text-primary':
                                        !isOverLimit && percentage < 80,
                                    'text-warning':
                                        !isOverLimit &&
                                        percentage >= 80 &&
                                        percentage < 100,
                                    'text-danger':
                                        isOverLimit || percentage >= 100,
                                },
                            )}
                        />
                    </svg>
                </div>
            )}

            <div
                className={cn('text-xs', {
                    'text-gray-500': !isOverLimit && percentage < 80,
                    'text-yellow-600':
                        !isOverLimit && percentage >= 80 && percentage < 100,
                    'text-red-500': isOverLimit || percentage >= 100,
                })}
                aria-live="polite"
                aria-label={`Character counter: ${remaining} remaining`}
            >
                {isOverLimit
                    ? `${Math.abs(remaining)} over limit`
                    : `${remaining} remaining`}
            </div>
        </div>
    )
}

export default CharacterCounter
