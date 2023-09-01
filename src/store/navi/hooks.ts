import { Board } from '@api/board/types'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/index'
import { naviActions } from 'store/navi'

export function useNaviState(): RootState['navi'] {
  return useSelector<RootState, RootState['navi']>((state) => state.navi)
}

export function useGetIsMenuOpen() {
  return useSelector<RootState, boolean>((state) => state.navi.isMenuOpen)
}

export function useGetIsLoginView() {
  return useSelector<RootState, boolean>((state) => state.navi.isLoginView)
}
export function useGetBoard() {
  return useSelector<RootState, Board[]>((state) => state.navi.board)
}

export function useBoard() {
  const dispatch = useDispatch()
  const board = useGetBoard()
  const handleSetBoard = useCallback(
    (board: Board[]) => {
      dispatch(naviActions.setBoard(board))
    },
    [dispatch],
  )
  return { board, handleSetBoard }
}

export function useIsLoginView() {
  const dispatch = useDispatch()
  const isLoginView = useGetIsLoginView()

  const handleSetIsLoginView = (isLoginView: boolean) => {
    dispatch(naviActions.setIsLoginView(isLoginView))
  }
  return { isLoginView, handleSetIsLoginView }
}

export function useIsMenuOpen() {
  const dispatch = useDispatch()
  const isMenuOpen = useGetIsMenuOpen()

  const handleSetMenuOnOff = useCallback(() => {
    dispatch(naviActions.menuOnOff())
  }, [dispatch])

  const handleSetMenuOnOffControl = useCallback(
    (payload: boolean) => {
      dispatch(naviActions.menuOnOffControl(payload))
    },
    [dispatch],
  )

  return { isMenuOpen, handleSetMenuOnOff, handleSetMenuOnOffControl }
}

// export function useUserInfo(): {
//   memIdx: number;
//   userid: string;
//   name: string;
//   email: string;
//   nickname: string;
// } {
//   const { userid, name, email, nickname, memIdx } = useSelector<
//     AppState,
//     AppState['auth']
//   >((state) => state.auth);
//   return { userid, name, email, nickname, memIdx };
// }
