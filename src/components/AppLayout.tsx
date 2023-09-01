import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Layout } from './base'
type NextPageWithLayout = NextPage & {
  Layout?: React.FC
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const AppLayout = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      //gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default AppLayout
