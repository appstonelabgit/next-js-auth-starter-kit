import PageHeading from '@/components/layout/page-heading'
import ProfileChangePassword from '@/components/profile/profile-change-password'
import ProfileInfo from '@/components/profile/profile-info'

export default function Profile() {
    return (
        <div className="@container mx-auto space-y-8 sm:px-6">
            <PageHeading
                heading="Profile"
                description="Manage your account settings and preferences."
            />

            <div className="grid grid-cols-2 gap-5">
                <ProfileInfo />
                <ProfileChangePassword />
            </div>
        </div>
    )
}
