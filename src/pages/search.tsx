import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box } from '@chakra-ui/react'
import { useSearchPosts } from '@hooks/queries/post/useSearchPosts'
import PostsListItem from '@views/board/postsListItem'
import PostsListSkeleton from '@views/board/postsListItem/PostsListItemSkeleton'
import EmptyPost from '@views/board/postsListItem/EmptyPost'
import Pagination from '@views/search/Pagination'

const SearchPage = () => {
  const router = useRouter()
  const { q: query, p: page } = router?.query
  const [searchTerm, setSearchTerm] = useState('')
  const { data: searchPostsData, isLoading } = useSearchPosts(searchTerm, '10', '0', {
    enabled: !!searchTerm, // searchTerm이 있을 때만 쿼리를 실행합니다.
  })

  useEffect(() => {
    if (!query) return
    setSearchTerm(query as string)
  }, [query])

  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    setCurrentPage(page)
    // handle data fetching or other logic here
    router.push({
      pathname: '/search',
      query: {
        ...router.query, // 현재의 모든 쿼리 파라미터를 유지합니다.
        p: page, // 페이지 번호를 업데이트합니다.
      },
    })
  }

  return (
    <Box>
      {isLoading && <PostsListSkeleton />}
      {!isLoading && searchPostsData?.result.posts.length === 0 && <EmptyPost />}
      {searchPostsData?.result.posts.map((post) => {
        return <PostsListItem post={post} />
      })}
      <Pagination total={10} current={currentPage} onPageChange={handlePageChange} />
    </Box>
  )
}

export default SearchPage
