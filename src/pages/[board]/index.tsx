import Board from '@views/board'
import useGetBoardId from '@hooks/useGetBoardId'
function BoardPage() {
  const boardId = useGetBoardId()

  return <Board boardId={boardId} />
}

export default BoardPage
