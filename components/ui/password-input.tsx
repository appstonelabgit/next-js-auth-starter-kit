'use client'
import { Input } from './input'
import { Label } from './label'
import { EyeIcon, EyeOffIcon } from 'lucide-react'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type PasswordInputProps = {
    id: string
    label: string
    placeholder?: string
    labelClass?: string
    required?: boolean
    register?: UseFormRegisterReturn
}

export const PasswordInput = ({
    id,
    label,
    placeholder,
    register,
    labelClass,
    required = true,
}: PasswordInputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div>
            <Label htmlFor={id} className={`${labelClass} mb-2`}>
                {label}
            </Label>
            <div className="relative">
                <Input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    className="pr-10"
                    {...register}
                    required={required}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-500 hover:text-gray-700"
                    aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                    }
                >
                    {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                    ) : (
                        <EyeIcon className="h-5 w-5" />
                    )}
                </button>
            </div>
        </div>
    )
}
