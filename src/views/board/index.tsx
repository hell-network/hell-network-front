import { Box, Flex, Heading } from '@chakra-ui/react'
import PostsListItem from '@views/board/postsListItem'
import useInfiniteScrollPosts from '@hooks/queries/post/useInfiniteScrollPosts'
import { useEffect, useMemo } from 'react'
import PostsListItemSkeleton from './postsListItem/PostsListItemSkeleton'

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

  console.log(
    'entry',
    entry?.isIntersecting,
    'hasNextPage= ',
    hasNextPage,
    ' postsData= ',
    postsData,
    ' isLoading = ',
    isLoading,
    'isFetchingNextPage = ',
    isFetchingNextPage,
  )

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
        <PostsListItem key={post.postId} post={post} boardSlug={boardSlug as string} />
      ))}
      {isFetchingNextPage &&
        Array.from({ length: 5 }, (v, i) => <PostsListItemSkeleton key={`skelton-posts-list-item-${i}`} />)}
      <Box ref={ref as any} />
    </Flex>
  )
}
export default Board
