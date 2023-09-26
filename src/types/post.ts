import { IDefaultResponse } from '@api/defaultInterface'

//
export type GetPostByIdResponse = Omit<IDefaultResponse, 'result'> & {
  result: Post
}

export type GetPostsResponse = Omit<IDefaultResponse, 'result'> & {
  result: {
    posts: Post[]
    lastId?: number
    isLast?: boolean
    totalCount?: number
  }
}

export type Tag = {
  tagId: string
  name: string
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
  tags?: Tag[]
}
