import { Box, Flex, Heading } from '@chakra-ui/react'
import PostsListItem from '@views/board/PostsListItem'
import useInfiniteScrollPosts from '@hooks/queries/post/useInfiniteScrollPosts'
import { useEffect, useMemo } from 'react'

const Board = ({ boardId }) => {
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

  console.log('hasNextPage= ', hasNextPage, ' postsData= ', postsData)

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isLoading])

  const allPosts = useMemo(() => {
    return postsData?.pages?.flatMap((pageData) => pageData?.result?.posts)
  }, [postsData?.pages])

  return (
    <Flex flexDirection="column" gap="8px" padding="1rem">
      <Heading color={'red.500'}>{boardSlug}</Heading>
      {allPosts?.map((post) => (
        <PostsListItem post={post} boardSlug={boardSlug as string} key={post.postId} />
      ))}
      <Box ref={ref as any} />
    </Flex>
  )
}
export default Board
