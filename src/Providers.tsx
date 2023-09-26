'use client'

import { QueryClient, QueryClientProvider, Hydrate } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@theme/index'
import store from '@store/index'

export default function Providers({ children, pageProps }: { children: React.ReactNode; pageProps: any }) {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider store={store}>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </Provider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
