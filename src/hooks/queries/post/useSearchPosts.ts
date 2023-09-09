import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from 'config/constants/queryKeys'
import { searchPosts } from '@api/post'
import { GetPostsResponse } from '@api/post/types'

export function useSearchPosts(
  searchString: string,
  page?: string,
  pageSize?: string,
  options?: UseQueryOptions<GetPostsResponse, AxiosError>,
) {
  const queryKey = queryKeys.searchPosts(searchString)

  return useQuery(queryKey, () => searchPosts(searchString), options)
}
