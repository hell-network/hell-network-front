import { GetBoardResponse } from '@api/board/types'
import axiosInstance from 'api'

export async function getBoard() {
  const response = await axiosInstance.get<GetBoardResponse>('/v1/board/getBoard')
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}
