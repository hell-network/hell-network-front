import { useEffect, useState, useRef } from 'react'

const useComponentSize = () => {
  const componentRef = useRef(null)
  const [componentSize, setComponentSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateSize = () => {
      if (componentRef.current) {
        const { clientWidth, clientHeight } = componentRef.current
        setComponentSize({ width: clientWidth, height: clientHeight })
      }
    }

    updateSize()

    window.addEventListener('resize', updateSize)

    return () => {
      window.removeEventListener('resize', updateSize)
    }
  }, [])

  return { componentRef, componentSize }
}

export default useComponentSize
