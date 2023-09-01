import { useGetPosts } from '@hooks/queries/post/useGetPosts'
import { useRouter } from 'next/router'
import PostsListItem from '@views/board/PostsListItem'
import { Flex } from '@chakra-ui/react'
function BoardPage() {
  const router = useRouter()
  const { board: boardSlug } = router.query
  const posts = useGetPosts(1)

  return (
    <Flex flexDirection="column" gap="8px" padding="1rem">
      {posts?.data?.result.map((post) => (
        <PostsListItem post={post} boardSlug={boardSlug as string} />
      ))}
    </Flex>
  )
}

export default BoardPage
