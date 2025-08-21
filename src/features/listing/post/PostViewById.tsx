import { useFetchPropertyById } from '@/api/services/app/posts/queries'
import { PostHeader } from './PostHeader'
import { PostImageGrid } from './PostImageGrid'
import { PostBody } from './PostBody'

const PostViewById = ({ postId }: { postId: string }) => {
  const { data, isLoading, isError } = useFetchPropertyById({
    id: postId || '',
  })

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (!data || isError) {
    return <p>Failed to fetch data</p>
  }

  return (
    <div className="app-container !max-w-[1100px]">
      <PostHeader data={data} />
      <PostImageGrid data={data} className="mt-2" />
      <PostBody data={data} />
    </div>
  )
}

export default PostViewById
