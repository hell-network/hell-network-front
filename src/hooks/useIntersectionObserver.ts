import { useState, useEffect, useRef, RefObject } from 'react'

interface Options {
  root?: RefObject<Element> | null
  rootMargin?: string
  threshold?: number | number[]
}

function useIntersectionObserver(options: Options = {}): [RefObject<Element>, IntersectionObserverEntry | undefined] {
  const { root = null, rootMargin, threshold = 0 } = options

  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const node = useRef<Element>(null)

  const observer = useRef(
    new IntersectionObserver(
      ([entry]) => {
        setEntry(entry)
      },
      {
        root: root?.current,
        rootMargin,
        threshold,
      },
    ),
  )

  useEffect(() => {
    const currentObserver = observer.current
    if (node.current) {
      currentObserver.observe(node.current)
    }

    return () => {
      if (node.current) {
        currentObserver.unobserve(node.current)
      }
    }
  }, [node.current])

  return [node, entry]
}

export default useIntersectionObserver
