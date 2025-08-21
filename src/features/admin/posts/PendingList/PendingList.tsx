import { DataTable } from '@/components/ui/data-table'
import { columns } from './pending-columns'
import { useFetchAllProperties } from '@/api/services/app/posts/queries'

export const PendingList = () => {
  const { data, isLoading } = useFetchAllProperties({})

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  )
}
