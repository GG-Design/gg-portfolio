import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }

    // Stop Lenis if it exists
    const lenis = (window as any).__lenis
    if (lenis) {
      lenis.scrollTo(0, { immediate: true })
    }

    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)

  }, [pathname])

  return null
}
