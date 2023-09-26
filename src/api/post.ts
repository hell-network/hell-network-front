import { GetPostByIdResponse, GetPostsResponse } from '@types/post'
import { API_URL } from '@constants/api'
import { apiRoutes } from '@constants/routes'
import { useFetch } from '@module/reactQueryManager'

export const registerPost = async (title: string, content: string, boardId: number) => {
  const response = await axiosInstance.post<GetPostsResponse>('/v1/post', {
    title,
    content,
    boardId,
  })
  return response.data // 데이터 값을 바로 반환하도록 처리합니다.
}

export const useGetPosts = async (boardId: number, id: number, postsCount = 5) => {
  return useFetch<GetPostsResponse>({
    url: `${API_URL}${apiRoutes.getPosts}`,
    params: {
      boardId,
      id,
      postsCount,
    },
  })
}

export const useGetPostById = async (id: number) => {
  return useFetch<GetPostByIdResponse>({
    url: `${API_URL}${apiRoutes.getPostById}`,
    params: {
      id,
    },
  })
}

export const useSearchPosts = async (searchString: string, page?: string, pageSize?: string) => {
  return useFetch<GetPostsResponse>({
    url: `${API_URL}${apiRoutes.searchPosts}`,
    params: { searchString, page, pageSize },
  })
}
