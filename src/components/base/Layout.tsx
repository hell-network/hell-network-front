import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import AppBar from './AppBar'
import { Box, Container, Flex } from '@chakra-ui/react'
import { useIsMenuOpen } from '@store/navi/hooks'
import Sidebar from './Sidebar'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  const { isMenuOpen } = useIsMenuOpen()
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {/* <Flex height={'100%'} maxWidth={'76.8rem'} margin="0 auto" min-width="500px" position="relative">
          <St.LayoutWrapper>
            <St.HomeSection>{children}</St.HomeSection>
          </St.LayoutWrapper>
        </Flex> */}
      </div>
    )
  }
  return (
    <Box>
      <AppBar />
      <Sidebar />
      <Box
        marginTop={'80px'}
        margin={'80px auto'}
        // justifyContent={'center'}
        // paddingTop="48px"
        // height={'100%'}
        maxWidth={'48rem'}
        width={'100%'}
        minWidth={'309px'}
        // position="relative"
      >
        {children}
      </Box>
    </Box>
  )
}

export default Layout
