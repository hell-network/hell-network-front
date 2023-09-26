import Script from 'next/script'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import AppLayout from 'components/AppLayout'
import useScrollRestoration from '@hooks/useScrollRestoration'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import 'style/custom-react-toastify.css'
import 'style/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '@toast-ui/editor/dist/toastui-editor.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import Providers from 'Providers'

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
  useScrollRestoration()

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
        <meta name="twitter:i mage" content="" />
        <meta name="twitter:description" content="-" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="" />
        <title>hell-network</title>
      </Head>
      <Providers pageProps={pageProps}>
        <GlobalHooks />
        <AppLayout {...props} />
      </Providers>

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
