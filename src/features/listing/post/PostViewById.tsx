import { useFetchPropertyById } from '@/api/services/app/posts/queries'
import { PostHeader } from './PostHeader'
import { PostImageGrid } from './PostImageGrid'
import { PostBody } from './PostBody'
import { PropertyStatus } from '@/enums/post'
import { Badge } from '@/components/ui/badge'

const PostViewById = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError } = useFetchPropertyById({
    id: postId || '',
  })

  const isRejected = data?.propertyStatus === PropertyStatus.Rejected

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data || isError) {
    return <p>Failed to fetch data</p>
  }

  return (
    <div className="app-container !max-w-[1100px]">
      {isRejected && <Badge variant={'destructive'}>REJECTED</Badge>}
      <PostHeader data={data} />
      <PostImageGrid data={data} className="mt-2" />
      <PostBody data={data} />
      {isRejected && (
        <p className="my-4 text-theme">
          <span className="font-medium">Rejected Reason:</span>{' '}
          {data.rejectionReason}
        </p>
      )}
    </div>
  )
}

export default PostViewById
