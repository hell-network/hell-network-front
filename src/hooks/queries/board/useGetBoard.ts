import { AxiosError } from 'axios'
import { useQuery, UseQueryOptions } from 'react-query'
import { queryKeys } from 'config/constants/queryKeys'
import { getBoard } from '@api/board'
import { GetBoardResponse } from '@api/board/types'

export function useGetBoard(options?: UseQueryOptions<GetBoardResponse, AxiosError>) {
  const queryKey = queryKeys.getBoard
  return useQuery(queryKey, () => getBoard(), options)
}
