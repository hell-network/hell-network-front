import { useBoard, useGetBoard } from '@store/navi/hooks'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'

const useGetBoardId = () => {
  const router = useRouter()
  const { board: boardSlug } = router?.query
  const { board } = useBoard()
  const [boardId, setBoardId] = useState(null)

  useEffect(() => {
    const findBoardId = () => {
      return board?.find((board) => board?.slug === (boardSlug as string))?.boardId
    }

    setBoardId(findBoardId)
  }, [board, boardSlug])

  return boardId
}

export default useGetBoardId
