import { useRouter } from 'next/router'
import PostView from '@views/board/postView'
import { Box } from '@chakra-ui/react'

function Post() {
  const router = useRouter()
  const { board, id, slug } = router.query
  return (
    <Box>
      <PostView id={id as string} />
    </Box>
  )
}

export default Post
