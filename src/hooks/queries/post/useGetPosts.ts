import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from '@constants/queryKeys'
import { getPosts } from '@api/post'
import { GetPostsResponse } from '@api/post/types'

export function useGetPosts(
  boardId: number,
  id?: number,
  postsCount?: number,
  options?: UseQueryOptions<GetPostsResponse, AxiosError>,
) {
  const queryKey = queryKeys.getPosts(boardId, id)

  return useQuery(queryKey, () => getPosts(boardId, id, postsCount), options)
}
