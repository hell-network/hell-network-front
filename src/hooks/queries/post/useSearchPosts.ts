import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from 'config/constants/queryKeys'
import { searchPosts } from '@api/post'
import { GetPostsResponse } from '@api/post/types'

export function useSearchPosts(
  searchString: string,
  take?: string,
  skip?: string,
  options?: UseQueryOptions<GetPostsResponse, AxiosError>,
) {
  const queryKey = queryKeys.searchPosts(searchString)
  if (!searchString) {
    return { data: null, isLoading: false }
  }

  return useQuery(queryKey, () => searchPosts(searchString), options)
}
