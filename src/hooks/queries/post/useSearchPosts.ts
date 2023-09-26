import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from '@constants/queryKeys'
import { searchPosts } from '@api/post'
import { GetPostsResponse } from '@api/post/types'

export function useSearchPosts(
  searchString: string,
  page?: string,
  pageSize?: string,
  options?: UseQueryOptions<GetPostsResponse, AxiosError>,
) {
  const queryKey = queryKeys.searchPosts(searchString, page, pageSize)

  return useQuery(queryKey, () => searchPosts(searchString, page, pageSize), options)
}
