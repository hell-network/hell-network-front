import { useInfiniteQuery } from 'react-query'
import { useRouter } from 'next/router'
import useIntersectionObserver from '@hooks/useIntersectionObserver'
import { getPosts } from '@api/post'

function useInfiniteScrollPosts(boardId) {
  const router = useRouter()
  const { board: boardSlug } = router.query

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    ['posts', boardId],
    async ({ pageParam }) => {
      console.log(pageParam)
      return (await getPosts(boardId, pageParam)).result // API 요청 함수
    },
    {
      getNextPageParam: (result) => {
        if (result?.isLast) return result?.lastId
        return false
      },
      enabled: !!boardId, // boardId가 null이나 undefined가 아닐 때만 쿼리를 활성화
    },
  )

  const [ref, entry] = useIntersectionObserver({
    threshold: 0.1,
  })

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    ref,
    entry,
    boardSlug,
  }
}

export default useInfiniteScrollPosts
