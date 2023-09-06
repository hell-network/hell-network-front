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

export const getPosts = async (boardId: number, id: number, postsCount = 5) => {
  const response = await axiosInstance.get<GetPostsResponse>('/v1/post/getPosts', {
    params: {
      boardId,
      id,
      postsCount,
    },
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}

export const getPostById = async (id: number) => {
  const response = await axiosInstance.get<GetPostByIdResponse>('/v1/post/getPostById', {
    params: { id },
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}

export const searchPosts = async (searchString: string, take?: string, skip?: string) => {
  const response = await axiosInstance.get<GetPostsResponse>('/v1/post/searchPosts', {
    params: { searchString, take, skip },
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}
