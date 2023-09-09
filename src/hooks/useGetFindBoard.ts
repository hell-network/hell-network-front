import { Board } from '@api/board/types'
import { useBoard } from '@store/navi/hooks'
import { useEffect, useState } from 'react'

const useGetFindBoard = (boardId: number) => {
  const { board } = useBoard()
  const [findBoard, setFindBoard] = useState<Board>(null)

  useEffect(() => {
    const findBoard = () => {
      return board?.find((board) => board.boardId === boardId)
    }
    setFindBoard(findBoard)
  }, [board, boardId])

  return findBoard
}

export default useGetFindBoard
