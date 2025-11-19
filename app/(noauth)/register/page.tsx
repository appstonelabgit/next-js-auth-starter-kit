'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PasswordInput } from '@/components/ui/password-input'
import { useAuth } from '@/hooks/use-auth'
import { LOGIN_PAGE } from '@/lib/redirect'
import { IRegister } from '@/types/auth'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

export default function Page() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const { register: signup } = useAuth()

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IRegister>({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    })

    const handleForm: SubmitHandler<IRegister> = async (data) => {
        try {
            await signup({
                ...data,
                redirect: encodeURIComponent(
                    searchParams.get('redirect') || '/app',
                ),
            })
            router.refresh()
        } catch {}
    }

    return (
        <div className="mt-8">
            <div className="bg-background border-border rounded-lg border p-5 shadow-sm sm:p-8">
                <form
                    className="space-y-4 sm:space-y-6"
                    onSubmit={handleSubmit(handleForm)}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <Label htmlFor="firstName">First name*</Label>
                            <div className="mt-2">
                                <Input
                                    id="firstName"
                                    {...register('first_name')}
                                    type="text"
                                    required
                                    placeholder="Enter your first name"
                                />
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="lastName">Last name</Label>
                            <div className="mt-2">
                                <Input
                                    id="lastName"
                                    {...register('last_name')}
                                    type="text"
                                    placeholder="Enter your last name"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Email address*</Label>
                        <Input
                            {...register('email')}
                            type="text"
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="space-y-2">
                        <PasswordInput
                            id="password"
                            label="Password*"
                            placeholder="Create a password"
                            required
                            register={register('password')}
                        />
                    </div>
                    <div className="space-y-2">
                        <PasswordInput
                            id="password_confirmation"
                            label="Confirm password*"
                            placeholder="Confirm your password"
                            required
                            register={register('password_confirmation')}
                        />
                    </div>

                    <div className="mt-6!">
                        <Button
                            loading={isSubmitting}
                            type="submit"
                            className="w-full"
                        >
                            Create account
                        </Button>
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
                    Already have an account?{' '}
                    <Link
                        href={`${LOGIN_PAGE}?redirect=${encodeURIComponent(
                            searchParams.get('redirect') || '/app',
                        )}`}
                        className="text-primary hover:text-primary-dark font-medium transition hover:underline hover:underline-offset-4"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
