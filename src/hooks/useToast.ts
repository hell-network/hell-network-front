import { toastContext } from '@context/Toast'
import { useContext } from 'react'

const useToast = () => {
  const { onToast } = useContext(toastContext)
  return { onToast }
}

export default useToast
