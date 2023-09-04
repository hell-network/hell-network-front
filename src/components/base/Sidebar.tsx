import { Box, Flex, Text } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useBoard, useIsMenuOpen } from '@store/navi/hooks'
import { useGetBoard } from '@hooks/queries/board/useGetBoard'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import SafeLink from '@components/SafeLink'
import { Board } from '@api/board/types'
import useGetBoardId from '@hooks/useGetBoardId'

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
        padding={'10px'}
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
  const router = useRouter()
  const { handleSetMenuOnOff, handleSetMenuOnOffControl, isMenuOpen } = useIsMenuOpen()
  const { data: boardData } = useGetBoard()
  const { handleSetBoard } = useBoard()
  const findBoardId = useGetBoardId()

  useEffect(() => {
    if (boardData?.result?.length === 0) return
    handleSetBoard(boardData?.result)
  }, [boardData, handleSetBoard])

  useEffect(() => {
    // 라우트가 변경될 때마다 사이드바를 닫습니다.
    handleSetMenuOnOffControl(false)
  }, [handleSetMenuOnOffControl, router.asPath])

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
        <Flex padding={'15px'} cursor={'pointer'}>
          <CloseIcon onClick={handleSetMenuOnOff} />
        </Flex>
        {boardData?.result?.map((board) => (
          <SidebarItem board={board} isActive={findBoardId === board.boardId} key={`sidebar-${board?.boardId}`} />
        ))}
      </Box>
    </Box>
  )
}

export default Sidebar
