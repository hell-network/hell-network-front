import Script from 'next/script'
import { Hydrate, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ReactQueryDevtools } from 'react-query/devtools'
import useBaseQueryClient from 'hooks/queries/useBaseQueryClient'
import store from 'store'
import AppLayout from 'components/AppLayout'

import { ToastProvider } from '@context/Toast'
import { Provider } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ChakraProvider } from '@chakra-ui/react'
import 'style/custom-react-toastify.css'
import 'style/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import theme from '../theme'
import SearchModal from '@components/base/SearchModal'

function GlobalHooks() {
  return null
}

declare global {
  interface Window {
    kakao: any
  }
}
function MyApp(props: AppProps) {
  const { pageProps } = props
  const queryClient = useBaseQueryClient()

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1, viewport-fit=cover"
        />
        <meta property="og:title" content={pageProps.ogTitle ?? ''} />
        <meta property="og:image" content={pageProps.ogImage ?? ''} />
        <meta property="og:description" content={pageProps.ogDescription ?? ''} />
        {/* <meta name="theme-color" content="#FFFFFF" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" /> */}
        <meta name="twitter:i mage" content="" />
        <meta name="twitter:description" content="-" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <title>westkite-admin</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <Provider store={store}>
            <ChakraProvider theme={theme}>
              <GlobalHooks />
              <ToastProvider>
                {/* <SearchModal /> */}
                <AppLayout {...props} />
              </ToastProvider>
            </ChakraProvider>
          </Provider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Script
        strategy="afterInteractive"
        id="google-tag"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      />
    </>
  )
}

export default MyApp
