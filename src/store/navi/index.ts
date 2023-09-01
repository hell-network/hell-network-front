import { Board } from '@api/board/types'
import { createSlice } from '@reduxjs/toolkit'

export type NaviStoreState = {
  isMenuOpen: boolean
  isLoginView: boolean
  board: Board[]
}
const initialState: NaviStoreState = {
  isMenuOpen: false,
  isLoginView: false,
  board: [
    {
      boardId: 0,
      name: '',
      slug: '',
    },
  ],
}

export const naviSlice = createSlice({
  name: 'navi',
  initialState: initialState,
  reducers: {
    menuOnOff: (state) => {
      state.isMenuOpen = !state.isMenuOpen
    },
    menuOnOffControl: (state, action) => {
      state.isMenuOpen = action.payload
    },
    setIsLoginView: (state, action) => {
      state.isLoginView = action.payload
    },
    setBoard: (state, action) => {
      state.board = action.payload
    },
  },
})

export const naviActions = { ...naviSlice.actions }
export default naviSlice
