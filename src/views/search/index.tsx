import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSearchPosts } from '@hooks/queries/post/useSearchPosts'
import PostsListItem from '@views/board/postsListItem'
import PostsListSkeleton from '@views/board/postsListItem/PostsListItemSkeleton'
import EmptyPost from '@views/board/postsListItem/EmptyPost'
import Pagination from '@views/search/Pagination'
import { FlexColumn } from '@components/common'
import { DEFAULT_PAGE_SIZE } from '@constants/index'

const Search = () => {
  const router = useRouter()
  const { q: query, p: page } = router?.query
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { data: searchPostsData, isLoading } = useSearchPosts(
    searchTerm,
    page as string,
    DEFAULT_PAGE_SIZE.toString(),
    {
      enabled: !!searchTerm, // searchTerm이 있을 때만 쿼리를 실행합니다.
    },
  )

  useEffect(() => {
    const pageParam = page ? page : '1'
    setCurrentPage(parseInt(pageParam as string))
  }, [page])

  useEffect(() => {
    if (!query) return
    setSearchTerm(query as string)
  }, [query])

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page)
      // handle data fetching or other logic here
      router.push({
        pathname: '/search',
        query: {
          ...router.query, // 현재의 모든 쿼리 파라미터를 유지합니다.
          p: page, // 페이지 번호를 업데이트합니다.
        },
      })
    },
    [router],
  )

  return (
    <FlexColumn>
      <Box>
        {isLoading && <PostsListSkeleton />}
        {!isLoading && searchPostsData?.result.posts.length === 0 && <EmptyPost />}
        {searchPostsData?.result.posts.map((post) => {
          return <PostsListItem post={post} />
        })}
        <Pagination
          totalCount={searchPostsData?.result?.totalCount}
          current={currentPage}
          onPageChange={handlePageChange}
          pageSize={DEFAULT_PAGE_SIZE}
        />
      </Box>
    </FlexColumn>
  )
}

export default Search
