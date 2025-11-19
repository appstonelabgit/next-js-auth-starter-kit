'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'
import { LOGIN_PAGE } from '@/lib/redirect'
import { IForgotPassword } from '@/types/auth'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Page() {
    const { forgotPassword } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IForgotPassword>({
        defaultValues: {
            email: '',
        },
    })

    const handleForm: SubmitHandler<IForgotPassword> = async (data) => {
        try {
            await forgotPassword(data)
        } catch {}
    }

    return (
        <div className="mt-8">
            <div className="bg-background border-border rounded-lg border p-5 shadow-sm sm:p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Forgot Password</h1>
                    <p className="text-gray mt-2">
                        Enter your email address and we&apos;ll send you a link
                        to reset your password.
                    </p>
                </div>
                <form className="space-y-6" onSubmit={handleSubmit(handleForm)}>
                    <div className="space-y-2">
                        <Label>Email address*</Label>
                        <Input
                            {...register('email')}
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            Send reset link
                        </Button>
                    </div>
                </form>

                <p className="text-gray mt-6 text-center text-sm">
                    Remember your password?{' '}
                    <Link
                        href={LOGIN_PAGE}
                        className="text-primary hover:text-primary-dark font-medium transition hover:underline hover:underline-offset-4"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
