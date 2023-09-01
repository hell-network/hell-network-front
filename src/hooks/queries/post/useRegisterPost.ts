import { AxiosError } from 'axios'
import { useMutation, UseMutationResult, UseMutationOptions } from 'react-query'
import { registerPost } from '@api/post'
import { GetPostsResponse, Post } from '@api/post/types'

type RegisterPostInput = {
  title: string
  content: string
  boardId: number
}

// Custom hook
export function useRegisterPost(): {
  mutatePost: UseMutationResult<GetPostsResponse, AxiosError, RegisterPostInput, unknown>
} {
  const mutationOptions: UseMutationOptions<GetPostsResponse, AxiosError, RegisterPostInput, unknown> = {
    mutationFn: (input: RegisterPostInput) => registerPost(input.title, input.content, input.boardId),
    onSuccess: (data) => {
      // Handle success, e.g., show a success notification
    },
    onError: (error: AxiosError) => {
      // Handle error, e.g., show an error notification
      console.error('Error registering post:', error.message)
    },
  }

  const mutatePost = useMutation(mutationOptions)

  return { mutatePost }
}
