/**
 * https://react-query.tanstack.com/reference/QueryClient
 */
import { useState } from 'react'
import { QueryClient } from 'react-query'

type QueryClientState = QueryClient

const useBaseQueryClient = (): QueryClientState => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            useErrorBoundary: true,
            refetchOnWindowFocus: false, // Disable automatic refetch on window focus
          },
          mutations: {
            useErrorBoundary: true,
          },
        },
      }),
  )
  return queryClient
}

export default useBaseQueryClient
