import { Box, Flex, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useBoard, useIsMenuOpen } from '@store/navi/hooks'
import { useGetBoard } from '@hooks/queries/board/useGetBoard'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import SafeLink from '@components/SafeLink'
import { Board } from '@api/board/types'

type SidebarItemProps = {
  board: Board
  isActive: boolean
}
const SidebarItem = ({ board, isActive }: SidebarItemProps) => {
  return (
    <SafeLink href={`/${board?.slug}`}>
      <Flex
        as="li"
        alignItems="center"
        backgroundColor={isActive ? 'gray.800' : 'transparent'}
        cursor="pointer"
        height={'36px'}
        _hover={{ backgroundColor: 'gray.700' }}
      >
        <Text fontWeight={isActive ? 'bold' : 'normal'} lineHeight={'22px'}>
          {board?.name}
        </Text>
      </Flex>
    </SafeLink>
  )
}

const Sidebar = () => {
  const { handleSetMenuOnOff, isMenuOpen } = useIsMenuOpen()
  const { data: boardData } = useGetBoard()
  const { handleSetBoard } = useBoard()
  const router = useRouter()
  const { board: boardSlug } = router?.query

  useEffect(() => {
    if (boardData?.result?.length === 0) return
    handleSetBoard(boardData?.result)
  }, [boardData, handleSetBoard])

  const findBoardId = useCallback(() => {
    return boardData?.result?.find((board) => board?.slug === (boardSlug as string))?.boardId
  }, [boardData?.result, boardSlug])

  return (
    <Box
      as="nav"
      height="100vh"
      width={'300px'}
      position={'fixed'}
      top="0"
      left={isMenuOpen ? '0px' : '-300px'}
      zIndex={'999'}
      transition={'.28s cubic-bezier(.4,0,.2,1)'}
      translateX={'100%'}
      backgroundColor="rgb(24, 28, 31)"
    >
      <Box as="ul">
        <Flex padding={'15px'}>
          <CloseIcon onClick={handleSetMenuOnOff} />
        </Flex>
        {boardData?.result?.map((board) => (
          <SidebarItem board={board} isActive={findBoardId() === board.boardId} />
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
