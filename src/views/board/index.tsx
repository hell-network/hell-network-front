import { Box, Flex, Heading } from '@chakra-ui/react'
import PostsListItem from '@views/board/postsListItem'
import useInfiniteScrollPosts from '@hooks/queries/post/useInfiniteScrollPosts'
import { useEffect, useMemo } from 'react'
import PostsListItemSkeleton from './postsListItem/PostsListItemSkeleton'
import EmptyPost from './postsListItem/EmptyPost'
import { FlexColumn } from '@components/common'

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

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage && !isLoading) {
      fetchNextPage()
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage, isLoading])

  const allPosts = useMemo(() => {
    return postsData?.pages?.flatMap((pageData) => pageData?.result?.posts)
  }, [postsData?.pages])

  return (
    <FlexColumn gap="8px" padding="1rem">
      <Heading color={'red.500'}>{boardSlug}</Heading>
      {allPosts?.map((post) => (
        <PostsListItem key={post?.postId} post={post} boardSlug={boardSlug as string} />
      ))}
      {allPosts?.length === 0 && <EmptyPost />}

      {isFetchingNextPage &&
        Array.from({ length: 5 }, (v, i) => <PostsListItemSkeleton key={`skelton-posts-list-item-${i}`} />)}
      <Box ref={ref as any} />
    </FlexColumn>
  )
}
export default Board
