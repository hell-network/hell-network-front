import { useRouter } from 'next/router'
import PostView from '@views/board/postView'

function Post() {
  const router = useRouter()
  const { board, id, slug } = router.query

  return (
    <div>
      <PostView id={id} />
    </div>
  )
}

export default Post
