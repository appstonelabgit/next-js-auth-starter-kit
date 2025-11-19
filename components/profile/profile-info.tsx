'use client'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { IAuth } from '@/types/auth'
import { useForm } from 'react-hook-form'

const ProfileInfo = () => {
    const {
        handleSubmit,
        register,
        formState: { isSubmitting },
    } = useForm<IAuth>({
        defaultValues: {
            name: '',
            email: '',
        },
    })

    const onSubmit = async (values: IAuth) => {
        try {
            console.log(`values =>`, values)
        } catch {}
    }

    return (
        <Card className="p-6">
            <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                    Update your profile information and preferences.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label>Name*</Label>
                        <Input
                            type="text"
                            placeholder="Enter name"
                            {...register('name')}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Email*</Label>
                        <Input
                            type="text"
                            placeholder="Enter your email"
                            {...register('email')}
                        />
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <Button type="submit" loading={isSubmitting}>
                        Submit
                    </Button>
                </div>
            </form>
        </Card>
    )
}

export default ProfileInfo
