import { useEffect } from 'react'
import { useRouter } from 'next/router'

function useScrollRestoration() {
  const router = useRouter()
  let isPop = false
  function saveScroll() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`scroll-${router.asPath}`, String(window.scrollY))
    }
  }

  function restoreScroll() {
    const savedScroll = sessionStorage.getItem(`scroll-${router.asPath}`)
    console.log('[seo] restoreScroll =', savedScroll, router.asPath)
    if (savedScroll) {
      const prevScrollY = parseInt(savedScroll, 10)
      window.requestAnimationFrame(() => window.scrollTo(0, prevScrollY))
    }
  }

  function scrollToTop() {
    window.requestAnimationFrame(() => window.scrollTo(0, 0))
  }
  useEffect(() => {
    console.log('[seo] router as path', router.asPath)
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual'
      window.onpopstate = () => {
        console.log('[seo] isPop')
        isPop = true
      }
    }

    const handleRouteChangeStart = () => {
      saveScroll()
    }

    const handleRouteChangeComplete = () => {
      if (isPop) {
        restoreScroll()
        isPop = false
      } else {
        scrollToTop()
      }
    }

    router.events.on('routeChangeStart', handleRouteChangeStart)
    router.events.on('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart)
      router.events.off('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [router])
}

export default useScrollRestoration
