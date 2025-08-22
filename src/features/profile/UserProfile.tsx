import { MyInfo } from './info'
import { ProfileListings } from './listings'

export const UserProfile = ({ profileId }: { profileId: string }) => {
  return (
    <div className="mx-20 mb-10">
      <p className="text-4xl font-medium text-neutral-800">Profile</p>
      <p className="text-md text-neutral-600 mb-8">
        View all profile details here
      </p>
      <div className="max-w-[1200px] mx-auto">
        <MyInfo profileId={profileId} />
        <ProfileListings className="my-6 px-6 py-3" />
      </div>
    </div>
  )
}
