'use client'

import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/use-auth'
import { LOGIN_PAGE } from '@/lib/redirect'
import { IResetPassword } from '@/types/auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Page() {
    const router = useRouter()
    const query = useSearchParams()
    const { resetPassword } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IResetPassword>({
        defaultValues: {
            password: '',
            password_confirmation: '',
        },
    })

    const handleForm: SubmitHandler<IResetPassword> = async (data) => {
        try {
            await resetPassword(query?.get('token') as string, data)
            router.push(LOGIN_PAGE)
        } catch {}
    }

    return (
        <div className="mt-8">
            <div className="bg-background border-border rounded-lg border p-5 shadow-sm sm:p-8">
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold">Reset Password</h1>
                    <p className="text-gray mt-2">
                        Enter your new password below.
                    </p>
                </div>

                <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <div className="space-y-2">
                        <PasswordInput
                            id="password"
                            label="New password*"
                            placeholder="Enter your new password"
                            register={register('password')}
                        />
                    </div>

                    <div className="space-y-2">
                        <PasswordInput
                            id="password_confirmation"
                            label="Confirm new password*"
                            placeholder="Confirm your new password"
                            register={register('password_confirmation')}
                        />
                    </div>

                    <div className="mt-6!">
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            Reset password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
