export const findBoard = ({ board, boardId }) => {
  return board?.find((board) => board.boardId === boardId)
}
