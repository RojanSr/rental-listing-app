import { useFetchAllProperties } from '@/api/services/app/posts/queries'
import { DataTable } from '@/components/ui/data-table'
import { postColumns } from './columns'
import type { PropertyStatus } from '@/enums/post'
import { useDeleteProperty } from '@/api/services/app/posts/mutation'

export const AdminPostList = ({
  propertyStatus,
}: {
  propertyStatus: PropertyStatus
}) => {
  const { data, isLoading } = useFetchAllProperties({
    propertyStatus,
  })
  const { mutateAsync: deleteProperty } = useDeleteProperty()

  return (
    <div className="container mx-auto">
      <DataTable
        columns={postColumns(propertyStatus, deleteProperty)}
        data={data}
        isLoading={isLoading}
      />
    </div>
  )
}
