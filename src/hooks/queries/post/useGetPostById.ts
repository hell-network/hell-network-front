import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from 'config/constants/queryKeys'
import { getPostById } from '@api/post'
import { GetPostByIdResponse } from '@api/post/types'

export function useGetPostsById(id: number, options?: UseQueryOptions<GetPostByIdResponse, AxiosError>) {
  const queryKey = queryKeys.getPostById(id)
  if (!id) {
    return { data: null, isLoading: false }
  }
  return useQuery(queryKey, () => getPostById(id), options)
}
