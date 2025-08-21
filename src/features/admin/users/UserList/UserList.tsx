import {
  useFetchAllUsers,
  useUpdateBanStatus,
} from '@/api/services/app/users/queries'
import { DataTable } from '@/components/ui/data-table'
import { userColumns } from './user-columns'

export const UserList = () => {
  const { data, isLoading } = useFetchAllUsers()
  const { mutateAsync: updateBanStatus } = useUpdateBanStatus()

  return (
    <div className="container mx-auto">
      <DataTable
        columns={userColumns(updateBanStatus)}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
