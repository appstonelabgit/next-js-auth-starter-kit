'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/use-auth'
import { ILogin } from '@/types/auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<ILogin>({
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const handleForm: SubmitHandler<ILogin> = async (data) => {
        try {
            const isLoggedIn = await login({
                ...data,
                redirect: encodeURIComponent(
                    searchParams.get('redirect') || '/app',
                ),
            })
            if (isLoggedIn) router.refresh()
        } catch {}
    }

    return (
        <div className="mt-8">
            <div className="bg-background border-border rounded-lg border p-5 shadow-sm sm:p-8">
                <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <div className="space-y-2">
                        <Label>Email address*</Label>
                        <Input
                            {...register('email')}
                            type="text"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <PasswordInput
                            id="password"
                            label="Password*"
                            placeholder="Enter your password"
                            register={register('password')}
                        />
                    </div>
                    <div className="mt-6!">
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            Sign in
                        </Button>
                    </div>
                    <div className="flex justify-end">
                        <Link
                            href="/forgot-password"
                            className="text-primary hover:text-primary-dark text-sm font-medium transition hover:underline hover:underline-offset-4"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </form>
                <div className="mt-6 hidden">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="border-border w-full border-t"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-background text-gray px-2">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                            Google
                        </Button>
                        <Button variant="outline" className="w-full">
                            GitHub
                        </Button>
                    </div>
                </div>

                <p className="text-gray mt-6 text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link
                        href={`/register?redirect=${encodeURIComponent(
                            searchParams.get('redirect') || '/app',
                        )}`}
                        className="text-primary hover:text-primary-dark font-medium transition hover:underline hover:underline-offset-4"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    )
}
