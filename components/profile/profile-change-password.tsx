'use client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { PasswordInput } from '@/components/ui/password-input'
import axios from '@/lib/axios'
import { useForm } from 'react-hook-form'

type IForm = {
    current_password: string
    password: string
    password_confirmation: string
}
export default function ProfileChangePassword() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<IForm>({
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    })

    const onSubmit = async (values: IForm) => {
        try {
            await axios.post(`/user/password/reset`, values)
        } catch {}
    }

    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                    Update your password to keep your account secure.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <PasswordInput
                        id="current_password"
                        label="Current password"
                        placeholder="Enter current password"
                        register={register('current_password')}
                    />
                    <PasswordInput
                        id="password"
                        label="New password"
                        placeholder="Create a new password"
                        register={register('password')}
                    />
                    <PasswordInput
                        id="password_confirmation"
                        label="Confirm password"
                        placeholder="Confirm new password"
                        register={register('password_confirmation')}
                    />
                    <div className="mt-8 flex justify-end">
                        <Button type="submit" loading={isSubmitting}>
                            Submit
                        </Button>
                    </div>
                </div>
            </form>
        </Card>
    )
}
