import { Box, Flex } from '@chakra-ui/react'
import { useGetPosts } from '@hooks/queries/post/useGetPosts'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { useRouter } from 'next/router'
import PostsListItem from '@views/board/PostsListItem'
import useInfiniteScrollPosts from '@hooks/queries/post/useInfinitescrollPosts'
import { useEffect } from 'react'

const Board = ({ boardId }) => {
  console.log(boardId)
  //const router = useRouter()
  //const { board: boardSlug } = router.query
  //   const { data: postsData, isLoading } = useGetPosts(boardId, 1, {
  //     enabled: !!boardId, // boardId가 없으면 쿼리를 실행하지 않음
  //   })

  //   useInfiniteScrollPosts()

  const {
    data: postsData,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    ref,
    entry,
    boardSlug,
  } = useInfiniteScrollPosts(boardId)

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting])

  console.log(postsData)
  return (
    <Flex flexDirection="column" gap="8px" padding="1rem">
      {/* {postsData?.result?.posts.map((post) => (
        <PostsListItem post={post} boardSlug={boardSlug as string} />
      ))} */}
      <Box ref={ref as any} />
    </Flex>
  )
}
export default Board
