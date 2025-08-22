import { useFetchAllProperties } from '@/api/services/app/posts/queries'
import { DataTable } from '@/components/ui/data-table'
import { useDeleteProperty } from '@/api/services/app/posts/mutation'
import { userPostColumns } from './user-post-columns'

export const UserPostList = () => {
  const { data, isLoading } = useFetchAllProperties({})
  const { mutateAsync: deleteProperty } = useDeleteProperty()

  return (
    <div className="container mx-auto my-2">
      <DataTable
        columns={userPostColumns(deleteProperty)}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
