import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

interface CopyButtonProps {
    content: string
    className?: string
}

const CopyButton: React.FC<CopyButtonProps> = ({
    content,
    className = 'w-10',
}) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content)
            setCopied(true)

            setTimeout(() => {
                setCopied(false)
            }, 2000)
        } catch {}
    }

    return (
        <button
            type="button"
            onClick={handleCopy}
            className={`size-icon flex items-center justify-center rounded-md border ${
                copied
                    ? 'border-green-500 bg-green-50'
                    : 'border-border bg-white hover:bg-gray-50'
            } ${className}`}
        >
            {copied ? (
                <Check className="h-4 w-4 text-green-500" />
            ) : (
                <Copy className="text-black-500 h-4 w-4" />
            )}
        </button>
    )
}

export default CopyButton
