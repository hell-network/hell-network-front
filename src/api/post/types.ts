import { IDefaultResponse } from '@api/default'

//
export type GetPostByIdResponse = Omit<IDefaultResponse, 'result'> & {
  result: Post
}

export type GetPostsResponse = Omit<IDefaultResponse, 'result'> & {
  result: Post[]
}

export interface Post {
  postId: number
  slug: string
  boardId: number
  categoryId: any
  userId: number
  title: string
  content: string
  datePosted: string
  views: number
  imageUrl: any
  likeCount: any
}
