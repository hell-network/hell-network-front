import { Box, Flex, Icon, Text, useDisclosure } from '@chakra-ui/react'
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'
import { useIsMenuOpen } from '@store/navi/hooks'
import SafeLink from '@components/SafeLink'

// position: relative;
// max-width: 76.8rem;
// z-index: 20;
// display: -webkit-flex;
// display: flex;
// -webkit-justify-content: center;
// justify-content: center;
// -webkit-align-items: center;
// align-items: center;
// margin: 0 auto;
// height: 4.8rem;
// padding: 0 1.2rem;
const AppBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { handleSetMenuOnOffControl, isMenuOpen } = useIsMenuOpen()
  return (
    <Box
      as="section"
      width="100%"
      top={0}
      margin="0 !important"
      overflow="hidden"
      position="fixed"
      transform="translateZ(0)"
      zIndex={50}
      background={'#000'}
      borderBottomColor={'rgba(43,46,57,1.00)'}
      borderBottomWidth="1px"
    >
      <Flex
        position="relative"
        maxWidth="76.8rem"
        zIndex={20}
        justifyContent="center"
        margin="0 auto"
        height="64px"
        padding="0 1.2rem"
      >
        <Box as="header" width={'100%'} height={'100%'}>
          <Flex height={'100%'}>
            <Flex justifyContent={'center'} alignItems={'center'}>
              <Flex justifyContent={'center'} alignItems={'center'}>
                <HamburgerIcon marginRight={'15px'} onClick={() => handleSetMenuOnOffControl(true)} />
              </Flex>
              <SafeLink href="/">
                <img
                  src="/images/home/main.png"
                  width={'24px'}
                  height={'24px'}
                  alt=""
                  style={{ marginRight: '16px' }}
                />
              </SafeLink>
              <SafeLink href="/">
                <Text fontWeight={'bold'} fontSize={'16px'} lineHeight={'24px'}>
                  Hell.net
                </Text>
              </SafeLink>
              <Flex margin="auto" paddingLeft={'24px'} paddingRight={'8px'}>
                <SearchIcon height={'32px'} onClick={onOpen} />
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}

export default AppBar
