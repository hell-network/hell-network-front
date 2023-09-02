import { GetPostByIdResponse, GetPostsResponse } from '@api/post/types'
import axiosInstance from 'api'

export const registerPost = async (title: string, content: string, boardId: number) => {
  const response = await axiosInstance.post<GetPostsResponse>('/v1/post', {
    title,
    content,
    boardId,
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getPosts(boardId: number, id: number) {
  const response = await axiosInstance.get<GetPostsResponse>('/v1/post/getPosts', {
    params: {
      boardId,
      id,
    },
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}

export async function getPostById(id: number) {
  const response = await axiosInstance.get<GetPostByIdResponse>('/v1/post/getPostById', {
    params: { id },
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}
