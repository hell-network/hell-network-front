import { GetBoardResponse } from '@types/board'
import { apiRoutes } from '@constants/routes'
import { API_URL } from '@constants/api'
import { useFetch } from 'module/reactQueryManager'

export const useGetBoard = () => {
  return useFetch<GetBoardResponse>({
    url: `${API_URL}${apiRoutes.getBoard}`,
  })
}
